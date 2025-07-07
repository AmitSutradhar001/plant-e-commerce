"use client";

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { getAllUserOrders } from "@/lib/actions/order.action";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Package,
  Calendar,
  MapPin,
  CreditCard,
  ShoppingBag,
  Truck,
  CheckCircle,
  Clock,
  AlertCircle,
  ExternalLink,
} from "lucide-react";
import Link from "next/link";

interface OrderItem {
  plantId: string;
  name: string;
  image: string;
  quantity: number;
  itemPrice: number;
  totalPrice: number;
}

interface Order {
  _id: string;
  userId: string;
  cart: {
    items: OrderItem[];
    totalPrice: number;
    discountedPrice: number;
    shippingPrice: number;
    taxPrice: number;
    discount: number;
  };
  address: {
    fullName: string;
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
    landmark?: string;
    phone: string;
  };
  status: string;
  paymentDetails: {
    method: string;
    stripeId?: string;
    paypalId?: string;
    status: string;
  };
  createdAt: string;
}

export default function OrdersPage() {
  const { user, isSignedIn } = useUser();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!isSignedIn || !user?.id) {
        setLoading(false);
        return;
      }

      try {
        const result = await getAllUserOrders(user.id);
        if (result.success) {
          setOrders(result.orders);
        } else {
          setError(result.message || "Failed to fetch orders");
        }
      } catch (err) {
        console.log(err);
        setError("An error occurred while fetching orders");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [isSignedIn, user?.id]);

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case "paid":
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case "pending":
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case "shipped":
        return <Truck className="w-4 h-4 text-blue-500" />;
      case "delivered":
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      default:
        return <AlertCircle className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "paid":
        return "bg-green-300 text-green-800 dark:bg-green-900/70 dark:text-green-400";
      case "pending":
        return "bg-yellow-300 text-yellow-800 dark:bg-yellow-900/70 dark:text-yellow-400";
      case "shipped":
        return "bg-blue-300 text-blue-800 dark:bg-blue-900/70 dark:text-blue-400";
      case "delivered":
        return "bg-green-300 text-green-800 dark:bg-green-900/70 dark:text-green-400";
      default:
        return "bg-gray-300 text-gray-800 dark:bg-gray-900/70 dark:text-gray-400";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getPaymentMethodIcon = (method: string) => {
    switch (method.toLowerCase()) {
      case "stripe":
        return <CreditCard className="w-4 h-4" />;
      case "paypal":
        return <ExternalLink className="w-4 h-4" />;
      default:
        return <CreditCard className="w-4 h-4" />;
    }
  };

  if (!isSignedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <Card className="w-full max-w-md mx-4">
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <Package className="w-16 h-16 mx-auto text-gray-400" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Sign in to view orders
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Please sign in to access your order history
              </p>
              <Link href="/log-in">
                <Button className="w-full">Sign In</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto"></div>
          <p className="text-gray-600 dark:text-gray-400">
            Loading your orders...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <Card className="w-full max-w-md mx-4">
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <AlertCircle className="w-16 h-16 mx-auto text-red-500" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Error loading orders
              </h2>
              <p className="text-gray-600 dark:text-gray-400">{error}</p>
              <Button onClick={() => window.location.reload()}>
                Try Again
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <ShoppingBag className="w-8 h-8 text-green-600" />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              My Orders
            </h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            Track your order history and delivery status
          </p>
        </div>

        {/* Orders List */}
        {orders.length === 0 ? (
          <Card className="w-full max-w-md mx-auto">
            <CardContent className="pt-6">
              <div className="text-center space-y-4">
                <Package className="w-16 h-16 mx-auto text-gray-400" />
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  No orders yet
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Start shopping to see your orders here
                </p>
                <Link href="/plants">
                  <Button>Browse Plants</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <Card
                key={order._id}
                className="overflow-hidden border-0 shadow-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm"
              >
                <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(order.status)}
                        <Badge className={getStatusColor(order.status)}>
                          {order.status.charAt(0).toUpperCase() +
                            order.status.slice(1)}
                        </Badge>
                      </div>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        Order #{order._id.slice(-8).toUpperCase()}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {formatDate(order.createdAt)}
                      </div>
                      <div className="flex items-center gap-1">
                        {getPaymentMethodIcon(order.paymentDetails.method)}
                        {order.paymentDetails.method.charAt(0).toUpperCase() +
                          order.paymentDetails.method.slice(1)}
                      </div>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="p-6">
                  {/* Order Summary */}
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Shipping Address */}
                    <div className="space-y-3">
                      <h3 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                        <MapPin className="w-5 h-5" />
                        Shipping Address
                      </h3>
                      <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                        <p className="font-medium text-gray-900 dark:text-white">
                          {order.address.fullName}
                        </p>
                        <p className="text-gray-600 dark:text-gray-400">
                          {order.address.street}
                        </p>
                        <p className="text-gray-600 dark:text-gray-400">
                          {order.address.city}, {order.address.state}{" "}
                          {order.address.postalCode}
                        </p>
                        <p className="text-gray-600 dark:text-gray-400">
                          {order.address.country}
                        </p>
                        {order.address.phone && (
                          <p className="text-gray-600 dark:text-gray-400">
                            📞 {order.address.phone}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Order Summary */}
                    <div className="space-y-3">
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        Order Summary
                      </h3>
                      <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">
                            Subtotal:
                          </span>
                          <span className="text-gray-900 dark:text-white">
                            ${(order.cart?.discountedPrice || 0).toFixed(2)}
                          </span>
                        </div>
                        {(order.cart?.discount || 0) > 0 && (
                          <div className="flex justify-between">
                            <span className="text-gray-600 dark:text-gray-400">
                              Discount:
                            </span>
                            <span className="text-green-600 dark:text-green-400">
                              -${(order.cart?.discount || 0).toFixed(2)}
                            </span>
                          </div>
                        )}
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">
                            Shipping:
                          </span>
                          <span className="text-gray-900 dark:text-white">
                            ${(order.cart?.shippingPrice || 0).toFixed(2)}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">
                            Tax:
                          </span>
                          <span className="text-gray-900 dark:text-white">
                            ${(order.cart?.taxPrice || 0).toFixed(2)}
                          </span>
                        </div>
                        <div className="border-t border-gray-200 dark:border-gray-600 pt-2">
                          <div className="flex justify-between font-semibold">
                            <span className="text-gray-900 dark:text-white">
                              Total:
                            </span>
                            <span className="text-green-600 dark:text-green-400 text-lg">
                              ${(order.cart?.totalPrice || 0).toFixed(2)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
