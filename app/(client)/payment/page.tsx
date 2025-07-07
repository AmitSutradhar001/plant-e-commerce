"use client";

import { useCartStore } from "@/store/cartStore";
import {
  MapPin,
  Home,
  Phone,
  Navigation,
  CreditCard,
  Lock,
  Shield,
  CheckCircle,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useState } from "react";
import { toast } from "sonner";

const PaymentPage = () => {
  const { cart, defaultAddress } = useCartStore();
  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState<string>("");
  const [isProcessing, setIsProcessing] = useState(false);

  // Redirect if no cart or address
  if (!cart || !defaultAddress) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-6 text-center">
            <div className="text-red-500 mb-4">
              <Shield className="w-16 h-16 mx-auto" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Missing Information
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              {!cart && "Your cart is empty. Please add items to continue."}
              {!defaultAddress &&
                "Please select a delivery address to continue."}
            </p>
            <Button
              onClick={() => window.history.back()}
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              Go Back
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handlePaymentMethodSelect = (method: string) => {
    setSelectedPaymentMethod(method);
  };

  const handlePayment = async () => {
    if (!selectedPaymentMethod) {
      toast.error("Please select a payment method");
      return;
    }
    if (selectedPaymentMethod === "stripe") {
      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        body: JSON.stringify({
          cart,
          address: defaultAddress,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      window.location.href = data.url;
      return;
    }
    if (selectedPaymentMethod === "paypal") {
      const res = await fetch("/api/paypal/create-order", {
        method: "POST",
        body: JSON.stringify({
          cart,
          address: defaultAddress,
        }),
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();
      window.location.href = data.approvalUrl;
      return;
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-8 ">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mt-10 mb-4 ">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Checkout
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Complete your purchase securely
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Payment Methods */}
          <div className="lg:col-span-2 space-y-6">
            {/* Payment Methods */}
            <Card className="border-0 shadow-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <CreditCard className="w-6 h-6 text-blue-600" />
                  Payment Method
                </CardTitle>
                <CardDescription>
                  Choose your preferred payment method
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* PayPal Option */}
                <div
                  onClick={() => handlePaymentMethodSelect("paypal")}
                  className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    selectedPaymentMethod === "paypal"
                      ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                      : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-8 bg-blue-600 rounded flex items-center justify-center">
                        <span className="text-white font-bold text-sm">
                          PayPal
                        </span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">
                          PayPal
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Pay with your PayPal account
                        </p>
                      </div>
                    </div>
                    {selectedPaymentMethod === "paypal" && (
                      <CheckCircle className="w-6 h-6 text-blue-600" />
                    )}
                  </div>
                </div>

                {/* Stripe Option */}
                <div
                  onClick={() => handlePaymentMethodSelect("stripe")}
                  className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    selectedPaymentMethod === "stripe"
                      ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                      : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-8 bg-purple-600 rounded flex items-center justify-center">
                        <span className="text-white font-bold text-sm">
                          Stripe
                        </span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">
                          Credit/Debit Card
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Pay with Visa, Mastercard, or other cards
                        </p>
                      </div>
                    </div>
                    {selectedPaymentMethod === "stripe" && (
                      <CheckCircle className="w-6 h-6 text-blue-600" />
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Security Notice */}
            <Card className="border-0 shadow-lg bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <Lock className="w-5 h-5 text-green-600" />
                  <div>
                    <h3 className="font-semibold text-green-800 dark:text-green-200">
                      Secure Payment
                    </h3>
                    <p className="text-sm text-green-700 dark:text-green-300">
                      Your payment information is encrypted and secure
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Address Only (Order Summary removed) */}
          <div className="space-y-6">
            {/* Selected Address */}
            <Card className="border-0 shadow-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-blue-600" />
                  Delivery Address
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-gray-500" />
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {defaultAddress.fullName}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                    <Home className="w-4 h-4" />
                    <span>
                      {defaultAddress.street}, {defaultAddress.city},{" "}
                      {defaultAddress.state}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                    <MapPin className="w-4 h-4" />
                    <span>
                      {defaultAddress.postalCode}, {defaultAddress.country}
                    </span>
                  </div>
                  {defaultAddress.landmark && (
                    <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                      <Navigation className="w-4 h-4" />
                      <span>{defaultAddress.landmark}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                    <Phone className="w-4 h-4" />
                    <span>{defaultAddress.phone}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Pay Button */}
            <Button
              onClick={handlePayment}
              disabled={!selectedPaymentMethod || isProcessing}
              className="w-full cursor-pointer h-12 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isProcessing ? (
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Processing...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Lock className="w-5 h-5" />
                  Pay ${cart.totalPrice.toFixed(2)}
                </div>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
