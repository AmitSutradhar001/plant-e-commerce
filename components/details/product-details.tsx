"use client";

import { useState } from "react";
// import { useCartStore } from "@/store/cartStore";
import { PlantTypeWithId } from "@/types";
import { useUser } from "@clerk/nextjs";
import { addOrUpdateCartItem } from "@/lib/actions/cart.action";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useCartStore } from "@/store/cartStore";

export default function ProductDetails({ plant }: { plant: PlantTypeWithId }) {
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const increment = () => setQuantity((prev) => prev + 1);
  const decrement = () => setQuantity((prev) => (prev > 1 ? prev - 1 : prev));
  const { user } = useUser();
  const router = useRouter();
  const { setCart, cart } = useCartStore((state) => state);
  const handleAdd = async () => {
    try {
      setLoading(true);
      if (!user?.id) {
        toast("Please login to add the item to your cart!");
        setTimeout(() => {
          router.push("/log-in/");
        }, 1000);
        return;
      }
      const item = {
        plantId: plant._id,
        userId: user.id,
        image: plant.images[0],
        banner: plant.banner,
        name: plant.name,
        quantity: quantity,
        itemPrice: plant.price,
        totalPrice: Number(quantity) * Number(plant.price),
        discount: plant.discount || 0, // ✅ Optional, if available
        shippingPrice: plant.shippingPrice || 0,
      };

      const newCart = await addOrUpdateCartItem(item);
      if (newCart.success) {
        toast.success(newCart.message);
        setCart(newCart.cart);
      }
      console.log(newCart);
    } catch (error) {
      console.log(error);
      toast.error("There is some problem. Please try again leater!");
    } finally {
      setLoading(false);
    }
  };
  const isOutOfStock = Number(plant.stock) <= 0;
  const isInCart = cart?.items.some((item) => item.plantId === plant._id);
  const isDisabled = isOutOfStock || loading || isInCart;
  return (
    <div className="mt-10 text-black dark:text-white transition-colors">
      {Number(plant.stock) <= 0 && (
        <span className="inline-block bg-red-500 rounded-xl text-white dark:text-black text-xs font-semibold px-3 py-1 mb-4">
          Sold Out
        </span>
      )}

      <h2 className="text-2xl font-light">{plant.name}</h2>
      <h2 className="text-2xl font-light">{plant.banner}</h2>
      <p className="text-4xl font-serif mt-2 mb-6">$ {plant.price}</p>

      <div className="mb-6">
        <label className="block mb-2 font-light">Quantity</label>
        <div className="flex items-center border border-black dark:border-white w-40">
          <button
            className="w-10 h-10 flex justify-center items-center text-xl border-r border-black dark:border-white"
            onClick={decrement}
            disabled={isDisabled}
          >
            -
          </button>
          <span className="flex-1 text-center">{quantity}</span>
          <button
            className="w-10 h-10 flex justify-center items-center text-xl border-l border-black dark:border-white"
            onClick={increment}
            disabled={isDisabled}
          >
            +
          </button>
        </div>
      </div>

      <button
        disabled={isDisabled}
        onClick={handleAdd}
        className={`w-full py-3 text-sm font-semibold uppercase tracking-wide transition-all duration-200 ${
          isDisabled
            ? "bg-gray-300 text-gray-500 dark:bg-gray-700 dark:text-gray-400 cursor-not-allowed"
            : "bg-black text-white hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-gray-300"
        }`}
      >
        {loading
          ? "Adding..."
          : isInCart
          ? "Already in Cart"
          : isOutOfStock
          ? "Out of Stock"
          : "Add to Cart"}
      </button>

      <div className="py-4 text-justify w-full max-h-72 mt-5 overflow-y-scroll scroll-hide">
        <article>
          <span className="text-red-500 text-5xl font-semibold float-left">
            {plant.description?.charAt(0)}
          </span>
          {plant.description?.slice(1)}
        </article>
      </div>
    </div>
  );
}
