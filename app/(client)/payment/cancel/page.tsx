"use client";

import { XCircle } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function PaymentCancel() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900 dark:to-red-800">
      <XCircle className="w-20 h-20 text-red-600 mb-6" />
      <h1 className="text-3xl font-bold text-red-800 dark:text-red-200 mb-2">
        Payment Cancelled
      </h1>
      <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
        Your payment was cancelled or unsuccessful. You can try again or return
        to the home page.
      </p>
      <div className="flex gap-4">
        <Link href="/payment">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">
            Retry Payment
          </Button>
        </Link>
        <Link href="/">
          <Button variant="outline">Go to Home</Button>
        </Link>
      </div>
    </div>
  );
}
