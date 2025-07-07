import { CartType, AddressType } from "@/store/cartStore";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-06-30.basil",
});

export async function POST(req: NextRequest) {
  const body = await req.json();
  const cart: CartType = body.cart;
  const amount = Number(cart.totalPrice);
  const address: AddressType = body.address;

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: "Root & Rise  - Plants",
            description: `Order ID: ${cart._id}`,
          },
          unit_amount: amount * 100, // $20.00
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: "http://localhost:3000/payment/success",
    cancel_url: "http://localhost:3000/payment/cancel",
    metadata: {
      cartId: cart._id,
      userId: cart.userId,
      addressId: address._id,
    },
  });

  return NextResponse.json({ url: session.url });
}
