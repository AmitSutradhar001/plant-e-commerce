"use server";

import { connectToDB } from "@/db/mongoose";
import { Order, Cart, CartItem, Address } from "@/db/schema";
import { clearCartOnServer } from "./cart.action";
import mongoose from "mongoose";

export async function createOrderFromSession(sessionData: {
  id: string;
  method: string;
  metadata: {
    cartId: string;
    userId: string;
    addressId: string;
  };
}) {
  try {
    await connectToDB();
    const objCart = new mongoose.Types.ObjectId(sessionData.metadata.cartId);
    const objAddress = new mongoose.Types.ObjectId(
      sessionData.metadata.addressId
    );
    // Fetch the cart data from database using cartId
    const cart = await Cart.findById(objCart);
    const address = await Address.findById(objAddress);
    if (!cart || !address) {
      throw new Error("Cart/Address not found!");
    }

    // Create the order
    const order = await Order.create({
      userId: sessionData.metadata.userId,
      cart: cart,
      address,
      status: "paid",
      paymentDetails: {
        method: sessionData.method,
        stripeId: sessionData.id,
        status: "completed",
      },
    });

    // Clear the cart after successful order creation

    await clearCartOnServer(cart._id);

    return {
      success: true,
      order: JSON.parse(JSON.stringify(order)),
      message: "Order created successfully",
    };
  } catch (error) {
    console.error("❌ createOrderFromStripeSession failed:", error);
    return {
      success: false,
      message: "Failed to create order",
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

export async function getUserOrders(userId: string) {
  try {
    await connectToDB();
    const orders = await Order.find({ userId }).sort({ createdAt: -1 }).lean();

    return {
      success: true,
      orders: JSON.parse(JSON.stringify(orders)),
    };
  } catch (error) {
    console.error("❌ getUserOrders failed:", error);
    return {
      success: false,
      orders: [],
      message: "Failed to fetch orders",
    };
  }
}

export async function getAllUserOrders(userId: string) {
  try {
    await connectToDB();

    const orders = await Order.find({ userId }).sort({ createdAt: -1 }).lean();

    return {
      success: true,
      orders: JSON.parse(JSON.stringify(orders)),
    };
  } catch (error) {
    console.error("❌ getAllUserOrders failed:", error);
    return {
      success: false,
      orders: [],
      message: "Failed to fetch orders",
    };
  }
}

export async function getAllOrdersForAdmin() {
  try {
    await connectToDB();
    const orders = await Order.find({}).sort({ createdAt: -1 }).lean();
    return {
      success: true,
      orders: JSON.parse(JSON.stringify(orders)),
    };
  } catch (error) {
    console.error("❌ getAllOrdersForAdmin failed:", error);
    return {
      success: false,
      orders: [],
      message: "Failed to fetch orders",
    };
  }
}
