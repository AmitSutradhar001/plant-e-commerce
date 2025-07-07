// components/CartCountBadge.tsx
"use client";
import { useEffect, useState } from "react";
import { useCartStore } from "@/store/cartStore";

export default function CartCountBadge() {
  const items = useCartStore((state) => state.cart?.items);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient || !items?.length)
    return (
      <span className="absolute -top-2 -right-2 bg-yellow-500 text-white text-[10px] px-1.5 py-0.5 rounded-full">
        0
      </span>
    );

  return (
    <span className="absolute -top-2 -right-2 bg-yellow-500 text-white text-[10px] px-1.5 py-0.5 rounded-full">
      {items.length}
    </span>
  );
}
