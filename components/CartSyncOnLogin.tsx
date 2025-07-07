"use client";

import { useAuth } from "@clerk/nextjs";
import { useEffect, useRef } from "react";
import { fetchUserCart } from "@/lib/actions/cart.action";
import { cartZodSchema } from "@/types/validator"; // ✅ use correct schema
import { useCartStore } from "@/store/cartStore"; // 🔓 Uncomment if Zustand is ready

export default function CartSyncOnLogin() {
  const { isSignedIn, userId } = useAuth();
  const hasFetched = useRef(false);
  const setCart = useCartStore((state) => state.setCart);
  const clearCart = useCartStore((state) => state.clearCart);
  useEffect(() => {
    const syncCart = async () => {
      if (!isSignedIn || !userId || hasFetched.current) return;

      const res = await fetchUserCart(userId);
      if (!res.success || !res.cart) return;

      try {
        const validatedCart = cartZodSchema.safeParse(res.cart); // ✅ validate full cart
        setCart(res.cart); // 🔓 Set Zustand cart state
        hasFetched.current = true;
      } catch (err) {
        console.error("❌ Zod validation failed:", err);
      }
    };

    syncCart();
  }, [isSignedIn, userId, setCart]);
  // ✅ Clear cart when user logs out
  useEffect(() => {
    if (!isSignedIn) {
      clearCart();
      localStorage.removeItem("cart-storage");
      hasFetched.current = false;
    }
  }, [isSignedIn, clearCart]);
  return null;
}
