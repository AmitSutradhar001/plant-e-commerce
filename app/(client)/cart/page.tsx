"use client";

import Image from "next/image";
import { useCartStore } from "@/store/cartStore";
import {
  increaseCartItem,
  decreaseCartItem,
  removeCartItem,
} from "@/lib/actions/cart.action";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import FullPageLoader from "@/app/loading";
import Link from "next/link";

const Cart = () => {
  const state = useCartStore((state) => state.cart);
  const { updateItemQty, removeItem, setCart } = useCartStore();
  const [loading, setLoading] = useState(true); // 👈 loading flag
  console.log(state);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 1000); // 1s fake loader to allow Zustand to hydrate

    return () => clearTimeout(timeout);
  }, []);
  if (loading) return <FullPageLoader />;
  const updateCart = async (
    type: "increase" | "decrease" | "remove",
    userId: string,
    plantId: string
  ) => {
    // 1️⃣ Optimistic UI update
    if (type === "increase") updateItemQty(plantId, +1);
    if (type === "decrease") updateItemQty(plantId, -1);
    if (type === "remove") removeItem(plantId);

    // 2️⃣ Call appropriate server action
    let res;
    try {
      if (type === "increase") {
        res = await increaseCartItem(userId, plantId);
      } else if (type === "decrease") {
        res = await decreaseCartItem(userId, plantId);
      } else if (type === "remove") {
        res = await removeCartItem(userId, plantId);
      }

      // 3️⃣ Sync state if success
      if (res?.success) {
        setCart(res.cart);
      } else {
        toast.error("Server failed. Reverting...");
      }
    } catch (err) {
      toast.error("Something went wrong.");
      console.error(err);
    }
  };

  // ✅ Show empty cart message
  if (!state || state.items.length === 0) {
    return (
      <div className="text-center py-20 h-96">
        <p className="text-gray-500 dark:text-gray-400 text-lg flex justify-center items-center h-full">
          🛒 Your cart is empty.
        </p>
      </div>
    );
  }

  return (
    <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
      <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
          Shopping Cart
        </h2>

        <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
          <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
            {/* Items */}
            <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 md:p-6 space-y-6">
              {state.items.map((item) => (
                <div
                  key={item._id}
                  className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0"
                >
                  <div className="shrink-0 md:order-1">
                    <Image
                      src={item.image}
                      alt={item.banner}
                      width={80}
                      height={80}
                      className="block"
                    />
                  </div>

                  <div className="flex items-center justify-between md:order-3 md:justify-end">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() =>
                          updateCart("decrease", item.userId, item.plantId)
                        }
                        className="btn-counter border-2 rounded-md border-gray-800 text-gray-800 dark:border-white"
                      >
                        -
                      </button>
                      <input
                        readOnly
                        value={item.quantity}
                        className="w-10 text-center text-sm font-medium text-gray-900 dark:text-white"
                      />
                      <button
                        onClick={() =>
                          updateCart("increase", item.userId, item.plantId)
                        }
                        className="btn-counter border-2 rounded-md border-gray-800 text-gray-800"
                      >
                        +
                      </button>
                    </div>
                    <div className="text-end md:order-4 md:w-32">
                      <p className="text-base font-bold text-gray-900 dark:text-white">
                        $ {item.totalPrice}
                      </p>
                    </div>
                  </div>

                  <div className="w-full flex-1 space-y-4 md:order-2 md:max-w-md">
                    <p className="text-base font-medium text-gray-900 dark:text-white overflow-x-clip">
                      {item.name} - {item.banner}
                    </p>
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() =>
                          updateCart("remove", item.userId, item.plantId)
                        }
                        className="text-sm font-medium text-red-600 hover:underline dark:text-red-500"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Summary */}
          <div className="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full">
            <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6">
              <p className="text-xl font-semibold text-gray-900 dark:text-white">
                Order summary
              </p>

              <div className="space-y-4">
                <dl className="flex justify-between">
                  <dt className="text-gray-500">Original price</dt>
                  <dd className="text-gray-700 dark:text-white">
                    $ {state.discountedPrice.toFixed(2)}
                  </dd>
                </dl>
                <dl className="flex justify-between">
                  <dt className="text-gray-500">Shipping</dt>
                  <dd className="text-green-500 ">
                    $ {state.shippingPrice.toFixed(2)}
                  </dd>
                </dl>
                <dl className="flex justify-between">
                  <dt className="text-gray-500">Discount</dt>
                  <dd className="text-green-500">
                    -$ {state.discount.toFixed(2)}
                  </dd>
                </dl>
                <dl className="flex justify-between">
                  <dt className="text-gray-500">Tax</dt>
                  <dd className="text-gray-700 dark:text-white">
                    $ {state.taxPrice.toFixed(2)}
                  </dd>
                </dl>
                <dl className="flex justify-between border-t border-gray-200 pt-2 dark:border-gray-700">
                  <dt className="font-bold text-gray-500">Total</dt>
                  <dd className="font-bold text-gray-700 dark:text-white">
                    $ {state.totalPrice.toFixed(2)}
                  </dd>
                </dl>
              </div>
              <Link href="/address">
                <button className="w-full rounded-lg bg-blue-500 py-2.5 text-white hover:bg-blue-700 cursor-pointer">
                  Proceed to Checkout
                </button>
              </Link>
              <div className="flex justify-center gap-2">
                <span className="text-sm text-gray-500 dark:text-gray-400 italic underline">
                  or
                </span>
              </div>
              <Link href="/plants">
                <button className="w-full rounded-lg bg-orange-400/90 py-2.5 text-white hover:bg-orange-700 cursor-pointer">
                  Return to Shop
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .btn-counter {
          height: 1.75rem;
          width: 1.75rem;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #f5f5f5;
          font-weight: bold;
        }
      `}</style>
    </section>
  );
};

export default Cart;
