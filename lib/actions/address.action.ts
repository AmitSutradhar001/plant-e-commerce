"use server";

import { Address } from "@/db/schema";
import { connectToDB } from "@/db/mongoose";
import { auth } from "@clerk/nextjs/server";

export async function createAddress(formData: FormData) {
  try {
    // Connect to database
    await connectToDB();
    const { userId } = await auth();
    if (!userId) {
      return {
        error: "Unauthorized",
        success: false,
      };
    }
    // Extract form data
    const fullName = formData.get("fullName") as string;
    const street = formData.get("street") as string;
    const city = formData.get("city") as string;
    const state = formData.get("state") as string;
    const postalCode = formData.get("postalCode") as string;
    const country = formData.get("country") as string;
    const landmark = formData.get("landmark") as string;
    const phone = formData.get("phone") as string;

    // Validate required fields
    if (
      !fullName ||
      !street ||
      !city ||
      !state ||
      !postalCode ||
      !country ||
      !phone
    ) {
      return {
        error: "All required fields must be filled out",
        success: false,
      };
    }

    // Create new address
    const newAddress = new Address({
      userId,
      fullName,
      street,
      city,
      state,
      postalCode,
      country,
      landmark: landmark || undefined, // Only save if provided
      phone,
    });

    // Save to database
    await newAddress.save();

    return {
      success: true,
      message: "Address saved successfully!",
    };
  } catch (error) {
    console.log("Error creating address:", error);
    return {
      error: "Failed to save address. Please try again.",
      success: false,
    };
  }
}
export async function getUserAddresses() {
  try {
    await connectToDB();
    const { userId } = await auth();
    if (!userId) {
      return { error: "Unauthorized", addresses: [] };
    }

    const addresses = await Address.find({ userId }).lean();

    // Convert MongoDB ObjectId (_id) to plain string `id`
    const cleaned = addresses.map(({ _id, __v, ...rest }: any) => ({
      _id: _id.toString(),
      ...rest,
    }));

    return { addresses: cleaned };
  } catch (error) {
    console.log("Error fetching addresses:", error);
    return { error: "Failed to fetch addresses", addresses: [] };
  }
}
