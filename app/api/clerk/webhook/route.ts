import { verifyWebhook } from "@clerk/nextjs/webhooks";
import { WebhookEvent } from "@clerk/nextjs/server";
import { NextRequest } from "next/server";
import { connectToDB } from "@/db/mongoose";
import { User, Cart } from "@/db/schema"; // adjust path if needed

// have to run this commend "ngrok http 3000" //--------------------------------------------

export async function POST(req: NextRequest) {
  try {
    await connectToDB();

    const evt = (await verifyWebhook(req)) as WebhookEvent;
    const eventType = evt.type;

    if (eventType === "user.created" || eventType === "user.updated") {
      const user = evt.data as WebhookEvent["data"] & {
        email_addresses: { email_address: string }[];
        first_name: string;
        last_name: string;
        image_url: string;
        id: string;
      };

      const email = user.email_addresses[0]?.email_address ?? "";
      const fullName = `${user.first_name ?? ""} ${
        user.last_name ?? ""
      }`.trim();

      const dbUser = await User.findOneAndUpdate(
        { clerkId: user.id },
        {
          $set: {
            name: fullName || "NO_NAME",
            email,
            image: user.image_url,
          },
          $setOnInsert: {
            clerkId: user.id,
            role: "user",
          },
        },
        { upsert: true, new: true }
      );
      // ✅ Create a cart for the new user if it doesn't exist
      const existingCart = await Cart.findOne({ userId: dbUser._id });

      if (!existingCart) {
        await Cart.create({
          userId: user.id, // use Clerk ID (string), as per your schema
          shippingPrice: 0,
          discount: 0,
          taxPrice: 0,
          totalPrice: 0,
          discountedPrice: 0,
          items: [], // no items yet
        });
      }
    }

    if (eventType === "user.deleted") {
      const deletedUser = evt.data as WebhookEvent["data"] & { id: string };
      await User.deleteOne({ clerkId: deletedUser.id });
    }

    return new Response(" Webhook processed", { status: 200 });
  } catch (err) {
    console.error(" Clerk webhook error:", err);
    return new Response("Webhook verification failed", { status: 400 });
  }
}
