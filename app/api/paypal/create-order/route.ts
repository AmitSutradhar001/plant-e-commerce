// app/api/paypal/create-order/route.ts
import { AddressType, CartType } from "@/store/cartStore";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const cart: CartType = body.cart;
    const address: AddressType = body.address;

    // ✅ VALIDATION: Check required environment variables
    if (
      !process.env.PAYPAL_CLIENT_ID ||
      !process.env.PAYPAL_SECRET ||
      !process.env.PAYPAL_API_BASE
    ) {
      return NextResponse.json(
        { error: "PayPal configuration error" },
        { status: 500 }
      );
    }

    // ✅ VALIDATION: Check required data
    if (!cart || !address) {
      return NextResponse.json(
        { error: "Missing cart or address data" },
        { status: 400 }
      );
    }

    const auth = Buffer.from(
      `${process.env.PAYPAL_CLIENT_ID}:${process.env.PAYPAL_SECRET}`
    ).toString("base64");

    // ✅ Store address ID in custom_id along with cart ID
    const customId = `${cart._id}|${address._id}`;

    const paypalPayload = {
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: {
            currency_code: "USD",
            value: cart.totalPrice.toFixed(2),
          },
          custom_id: customId, // ✅ Store both cart and address IDs
          invoice_id: `${cart.userId}-${Date.now()}`,
          // Remove description since PayPal doesn't preserve it in webhooks
        },
      ],
      application_context: {
        return_url: "http://localhost:3000/payment/success?method=paypal",
        cancel_url: "http://localhost:3000/payment/cancel",
      },
    };

    const res = await fetch(
      `${process.env.PAYPAL_API_BASE}/v2/checkout/orders`,
      {
        method: "POST",
        headers: {
          Authorization: `Basic ${auth}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(paypalPayload),
      }
    );

    if (!res.ok) {
      return NextResponse.json(
        { error: "Failed to create PayPal order" },
        { status: res.status }
      );
    }

    const data = await res.json();

    const approvalUrl = data.links?.find(
      (l: unknown) => (l as { rel: string }).rel === "approve"
    )?.href;

    if (!approvalUrl) {
      return NextResponse.json(
        { error: "No approval URL found" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      id: data.id,
      approvalUrl,
    });
  } catch (error) {
    console.error("❌ PayPal create order error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
