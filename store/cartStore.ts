import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

export type CartItemType = {
  _id: string;
  plantId: string;
  userId: string;
  cartId: string;
  image: string;
  banner: string;
  name: string;
  quantity: number;
  shippingPrice: number;
  discount: number;
  itemPrice: number;
  totalPrice: number;
};

export type CartType = {
  _id: string;
  userId: string;
  items: CartItemType[];
  shippingPrice: number;
  taxPrice: number;
  discount: number;
  totalPrice: number;
  discountedPrice: number;
  createdAt: string;
  updatedAt: string;
};

export type AddressType = {
  _id: string;
  fullName: string;
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  landmark?: string;
  phone: string;
  userId: string;
};

interface CartState {
  cart: CartType | null;
  defaultAddress: AddressType | null;
  setCart: (cart: CartType | null) => void;
  updateItemQty: (plantId: string, delta: number) => void;
  removeItem: (plantId: string) => void;
  clearCart: () => void;
  setDefaultAddress: (address: AddressType | null) => void;
}

// 👉 Helper to clean cart if no items remain
const cleanIfCartEmpty = (cart: CartType): CartType | null => {
  return cart.items.length === 0 ? null : cart;
};

export const useCartStore = create<CartState>()(
  devtools(
    persist(
      (set, get) => ({
        cart: null,
        defaultAddress: null,

        setCart: (cart) => {
          console.log("🛒 Zustand cart updated:", cart);
          set({ cart });
        },

        updateItemQty: (plantId, delta) => {
          const cart = get().cart;
          if (!cart) return;

          const updatedItems = cart.items
            .map((item) =>
              item.plantId === plantId
                ? {
                    ...item,
                    quantity: item.quantity + delta,
                    totalPrice: (item.quantity + delta) * item.itemPrice,
                  }
                : item
            )
            .filter((item) => item.quantity > 0);

          const newCart: CartType = {
            ...cart,
            items: updatedItems,
          };

          set({ cart: cleanIfCartEmpty(newCart) });
        },

        removeItem: (plantId) => {
          const cart = get().cart;
          if (!cart) return;

          const filteredItems = cart.items.filter(
            (item) => item.plantId !== plantId
          );

          const newCart: CartType = {
            ...cart,
            items: filteredItems,
          };

          set({ cart: cleanIfCartEmpty(newCart) });
        },

        clearCart: () => set({ cart: null }),

        setDefaultAddress: (address) => {
          set({ defaultAddress: address });
        },
      }),
      {
        name: "cart-storage",
      }
    ),
    {
      name: "CartStore",
    }
  )
);
