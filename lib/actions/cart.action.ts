// lib/actions/cart.actions.ts
"use server";

import { connectToDB } from "@/db/mongoose";
import { Cart, CartItem } from "@/db/schema";
import { CartItemType } from "@/types/index";
import { cartItemZodSchema } from "@/types/validator";
import mongoose from "mongoose";

export async function fetchUserCart(userId: string) {
  try {
    await connectToDB();
    const cart = await Cart.findOne({ userId }).populate("items");
    return {
      success: true,
      cart: cart ? JSON.parse(JSON.stringify(cart)) : null,
    };
  } catch (error) {
    console.error("❌ fetchUserCart failed:", error);
    return {
      success: false,
      cart: null,
      message: "Failed to fetch cart.",
    };
  }
}

export async function addOrUpdateCartItem(item: CartItemType) {
  const validatedItem = cartItemZodSchema.parse(item);
  await connectToDB();

  const cart = await Cart.findOne({ userId: validatedItem.userId });
  if (!cart) {
    return {
      success: false,
      message: "There is a problem, Please try again leater!",
    };
  }

  let cartItem = await CartItem.findOne({
    cartId: cart._id,
    plantId: validatedItem.plantId,
  });

  if (cartItem) {
    cartItem.quantity += validatedItem.quantity;
    cartItem.itemPrice = validatedItem.itemPrice;
    cartItem.shippingPrice = validatedItem.shippingPrice ?? 0;
    cartItem.discount = validatedItem.discount ?? 0;
    cartItem.totalPrice = cartItem.quantity * cartItem.itemPrice;
    await cartItem.save();
  } else {
    cartItem = await CartItem.create({
      cartId: cart._id,
      userId: validatedItem.userId,
      plantId: validatedItem.plantId,
      quantity: validatedItem.quantity,
      itemPrice: validatedItem.itemPrice,
      totalPrice: validatedItem.totalPrice,
      image: validatedItem.image,
      banner: validatedItem.banner,
      name: validatedItem.name,
      discount: validatedItem.discount ?? 0,
      shippingPrice: validatedItem.shippingPrice ?? 0,
    });
    cart.items.push(cartItem._id);
    await cart.save();
  }

  await recalculateCart(cart._id);
  const updatedCart = await Cart.findById(cart._id).populate("items");
  return {
    success: true,
    cart: JSON.parse(JSON.stringify(updatedCart)),
    message: "Plant added to the cart.",
  };
}

export async function increaseCartItem(userId: string, plantId: string) {
  await connectToDB();
  const cart = await Cart.findOne({ userId });
  if (!cart)
    return {
      success: false,
      message: "There is a problem, Please try again leater!",
    };

  const item = await CartItem.findOne({ cartId: cart._id, plantId });
  if (!item)
    return {
      success: false,
      message: "There is a problem, Please try again leater!",
    };

  item.quantity += 1;
  item.totalPrice = item.quantity * item.itemPrice;
  await item.save();
  await recalculateCart(cart._id);

  const updatedCart = await Cart.findById(cart._id).populate("items");
  return { success: true, cart: JSON.parse(JSON.stringify(updatedCart)) };
}

export async function decreaseCartItem(userId: string, plantId: string) {
  await connectToDB();
  const cart = await Cart.findOne({ userId });
  if (!cart)
    return {
      success: false,
      message: "There is a problem, Please try again leater!",
    };

  const item = await CartItem.findOne({ cartId: cart._id, plantId });
  if (!item)
    return {
      success: false,
      message: "There is a problem, Please try again leater!",
    };

  item.quantity -= 1;
  if (item.quantity <= 0) {
    await item.deleteOne();
    cart.items.pull(item._id);
  } else {
    item.totalPrice = item.quantity * item.itemPrice;
    await item.save();
  }

  await cart.save();
  await recalculateCart(cart._id);
  const updatedCart = await Cart.findById(cart._id).populate("items");
  return { success: true, cart: JSON.parse(JSON.stringify(updatedCart)) };
}

export async function removeCartItem(userId: string, plantId: string) {
  await connectToDB();
  const cart = await Cart.findOne({ userId });
  if (!cart) return { success: false };

  const item = await CartItem.findOne({ cartId: cart._id, plantId });
  if (!item) return { success: false };

  await item.deleteOne();
  cart.items.pull(item._id);
  await cart.save();

  await recalculateCart(cart._id);
  const updatedCart = await Cart.findById(cart._id).populate("items");
  return { success: true, cart: JSON.parse(JSON.stringify(updatedCart)) };
}

async function recalculateCart(cartId: string) {
  const items = await CartItem.find({ cartId });

  const subtotal = items.reduce((sum, item) => sum + item.totalPrice, 0);
  const discount = items.reduce(
    (sum, item) => sum + (item.discount || 0) * item.quantity,
    0
  );
  const shipping = items.reduce(
    (sum, item) => sum + (item.shippingPrice || 0),
    0
  );

  const taxRate = 0.18;
  const tax = parseFloat((subtotal * taxRate).toFixed(2));
  const total = subtotal + tax + shipping;
  const discountedTotal = total - discount - tax;

  await Cart.findByIdAndUpdate(cartId, {
    taxPrice: tax,
    shippingPrice: shipping,
    totalPrice: total,
    discount,
    discountedPrice: discountedTotal,
  });
}

export async function clearCartOnServer(cartId: string) {
  try {
    await connectToDB();
    // Remove all items from the cart
    const objectId = new mongoose.Types.ObjectId(cartId);
    const cart = await Cart.findById(objectId);
    if (!cart) return { success: false, message: "Cart not found" };
    cart.items = [];
    cart.totalPrice = 0;
    cart.discountedPrice = 0;
    cart.shippingPrice = 0;
    cart.taxPrice = 0;
    cart.discount = 0;
    await cart.save();
    // Optionally, remove all CartItem documents for this cart
    await CartItem.deleteMany({ cartId });
    return { success: true };
  } catch (error) {
    return { success: false, message: "Failed to clear cart." };
  }
}
