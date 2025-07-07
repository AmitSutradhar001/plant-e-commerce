// app/api/paypal/webhook/route.ts
import { NextRequest, NextResponse } from "next/server";
import { createOrderFromSession } from "@/lib/actions/order.action";

export async function POST(req: NextRequest) {
  const rawBody = await req.text();
  const transmissionId = req.headers.get("paypal-transmission-id")!;
  const timestamp = req.headers.get("paypal-transmission-time")!;
  const webhookId = process.env.PAYPAL_WEBHOOK_ID!;
  const certUrl = req.headers.get("paypal-cert-url")!;
  const authAlgo = req.headers.get("paypal-auth-algo")!;
  const transmissionSig = req.headers.get("paypal-transmission-sig")!;

  // Verify signature
  const verifyRes = await fetch(
    `${process.env.PAYPAL_API_BASE}/v1/notifications/verify-webhook-signature`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${Buffer.from(
          `${process.env.PAYPAL_CLIENT_ID}:${process.env.PAYPAL_SECRET}`
        ).toString("base64")}`,
      },
      body: JSON.stringify({
        auth_algo: authAlgo,
        cert_url: certUrl,
        transmission_id: transmissionId,
        transmission_sig: transmissionSig,
        transmission_time: timestamp,
        webhook_id: webhookId,
        webhook_event: JSON.parse(rawBody),
      }),
    }
  );

  const verifyJson = await verifyRes.json();

  if (verifyJson.verification_status !== "SUCCESS") {
    return new NextResponse("Invalid signature", { status: 400 });
  }

  const event = JSON.parse(rawBody);

  if (event.event_type === "PAYMENT.CAPTURE.COMPLETED") {
    const resource = event.resource;

    // ✅ Extract cartId and addressId from custom_id (format: "cartId|addressId")
    const customId = resource.custom_id;
    const [cartId, addressId] = customId ? customId.split("|") : [null, null];

    const invoiceId = resource.invoice_id;

    const userId = invoiceId?.split("-")[0];

    // ✅ FIXED: Use PayPal-specific order creation function
    console.log(
      "resource.id, method, metadata={cartId,userId,addressId} :",
      resource.id,
      "payPal",
      cartId,
      userId,
      addressId
    );
    await createOrderFromSession({
      id: String(resource.id),
      method: "paypal",
      metadata: {
        cartId,
        userId,
        addressId,
      },
    });

    return new NextResponse("✅ Order captured", { status: 200 });
  }

  return new NextResponse("✅ Event received", { status: 200 });
}
