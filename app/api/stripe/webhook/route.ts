import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { createOrderFromSession } from "@/lib/actions/order.action";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-06-30.basil",
});

export async function POST(req: NextRequest) {
  const body = await req.text(); // required for signature verification
  const signature = req.headers.get("stripe-signature");
  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature!,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.log(err);
    return new NextResponse("Webhook Error", { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const cartId = session.metadata?.cartId;
    const addressId = session.metadata?.addressId;

    if (!cartId || !addressId) {
      return new NextResponse("Missing metadata", { status: 400 });
    }

    try {
      console.log(
        "session.id, method, metadata={cartId,userId,addressId} :",
        session.id,
        "stripe",
        session.metadata?.cartId,
        session.metadata?.userId,
        session.metadata?.addressId
      );
      const result = await createOrderFromSession({
        id: session.id,
        method: "stripe",
        metadata: {
          cartId: session.metadata?.cartId!,
          userId: session.metadata?.userId!,
          addressId: session.metadata?.addressId!,
        },
      });

      if (result.success) {
        return new NextResponse("✅ Order created", { status: 200 });
      } else {
        return new NextResponse("Failed to create order", { status: 500 });
      }
    } catch (error) {
      return new NextResponse("Internal server error", { status: 500 });
    }
  }

  return new NextResponse("Unhandled event", { status: 200 });
}
