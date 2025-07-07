"use client";

import { useEffect, useState } from "react";
import { CheckCircle, AlertCircle } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cartStore";

export default function PaymentSuccess() {
  const { clearCart, setDefaultAddress } = useCartStore();
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading"
  );

  useEffect(() => {
    const url = new URL(window.location.href);
    const token = url.searchParams.get("token");
    const method = url.searchParams.get("method");

    if (method === "paypal" && token) {
      fetch(`/api/paypal/capture-order?token=${token}`)
        .then((res) => {
          if (!res.ok) throw new Error();
          return res.json();
        })
        .then(() => {
          setStatus("success");

          // ✅ ✅ Move Zustand clearing HERE — only after order is created
          clearCart();
          setDefaultAddress(null);
        })
        .catch((err) => {
          console.error("❌ Error capturing PayPal order:", err);
          setStatus("error");
        });
    } else {
      // ✅ For Stripe: clear immediately (webhook already ran)
      clearCart();
      setDefaultAddress(null);
      setStatus("success");
    }
  }, [clearCart, setDefaultAddress]);

  // Show loading state while capturing PayPal order
  if (status === "loading") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-white to-green-100 dark:from-gray-900 dark:to-green-900">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mb-6"></div>
        <h1 className="text-2xl font-bold text-green-700 dark:text-green-200 mb-2">
          Processing Payment...
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300">
          Please wait while we confirm your payment.
        </p>
      </div>
    );
  }

  // Show error state if capture failed
  if (status === "error") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900 dark:to-red-800">
        <AlertCircle className="w-20 h-20 text-red-500 mb-6" />
        <h1 className="text-3xl font-bold text-red-700 dark:text-red-200 mb-2">
          Payment Processing Error
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
          There was an issue processing your payment. Please contact support.
        </p>
        <div className="flex gap-4">
          <Link href="/payment">
            <Button className="bg-red-600 hover:bg-red-700 text-white">
              Try Again
            </Button>
          </Link>
          <Link href="/">
            <Button variant="outline">Go to Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  // Show success state
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-white to-green-100 dark:from-gray-900 dark:to-green-900">
      <CheckCircle className="w-20 h-20 text-green-500 mb-6" />
      <h1 className="text-3xl font-bold text-green-700 dark:text-green-200 mb-2">
        Payment Successful!
      </h1>
      <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
        Thank you for your purchase. Your order has been placed successfully.
      </p>
      <div className="flex gap-4">
        <Link href="/">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">
            Go to Home
          </Button>
        </Link>
        <Link href="/orders">
          <Button variant="outline">View Orders</Button>
        </Link>
      </div>
    </div>
  );
}
