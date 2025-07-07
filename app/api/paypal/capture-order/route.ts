// app/api/paypal/capture-order/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const token = searchParams.get("token");

  if (!token) {
    return NextResponse.json(
      { error: "Missing PayPal token" },
      { status: 400 }
    );
  }

  try {
    if (
      !process.env.PAYPAL_CLIENT_ID ||
      !process.env.PAYPAL_SECRET ||
      !process.env.PAYPAL_API_BASE
    ) {
      return NextResponse.json(
        { error: "PayPal config missing" },
        { status: 500 }
      );
    }

    const auth = Buffer.from(
      `${process.env.PAYPAL_CLIENT_ID}:${process.env.PAYPAL_SECRET}`
    ).toString("base64");

    // ✅ Call PayPal to capture the order
    const captureRes = await fetch(
      `${process.env.PAYPAL_API_BASE}/v2/checkout/orders/${token}/capture`,
      {
        method: "POST",
        headers: {
          Authorization: `Basic ${auth}`,
          "Content-Type": "application/json",
        },
      }
    );

    const captureData = await captureRes.json();

    if (!captureRes.ok || captureData.status !== "COMPLETED") {
      return NextResponse.json(
        { error: "Failed to capture PayPal order", details: captureData },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "PayPal order captured. Webhook will process the order.",
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: "Server error",
        details: error instanceof Error ? error.message : error,
      },
      { status: 500 }
    );
  }
}
