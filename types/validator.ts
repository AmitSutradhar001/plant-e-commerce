import { z } from "zod";

export const userZodSchema = z.object({
  clerkId: z.string().min(1),
  name: z.string().min(1).default("NO_NAME"),
  email: z.string().email("Email is required!"),
  image: z.string().url().optional(),
  role: z.enum(["user", "admin"]).default("user"),
  addresses: z.array(z.string().length(24)).optional(), // array of ObjectIds
});
export const addressZodSchema = z.object({
  userId: z.string().length(24), // MongoDB ObjectId
  fullName: z.string().min(1),
  street: z.string().min(1),
  city: z.string().min(1),
  state: z.string().min(1),
  postalCode: z.string().min(4),
  country: z.string().min(1),
  phone: z.string().min(1),
});
export const plantZodSchema = z.object({
  name: z.string().min(1),
  slug: z.string().min(1),
  category: z.string().default("unknown"),
  images: z.array(z.string().url()),
  banner: z.string().min(1),
  description: z.string().min(1),
  stock: z.number().int().nonnegative().default(1),
  price: z.number().nonnegative().default(0),
  discount: z.number().nonnegative().default(0),
  rating: z.number().min(0).max(5).default(0),
  numReviews: z.number().int().nonnegative().default(0),
  shippingPrice: z.number().int().nonnegative().default(0),
});
export const cartItemZodSchema = z.object({
  plantId: z.string().length(24),
  userId: z.string().min(1).optional(),
  image: z.string().url(),
  banner: z.string().min(1),
  name: z.string().min(1),
  quantity: z.number().int().min(1),
  itemPrice: z.number().nonnegative().default(0),
  totalPrice: z.number().nonnegative().default(0),
  shippingPrice: z.number().nonnegative().default(0).optional(),
  discount: z.number().nonnegative().default(0).optional(),
});
export const cartZodSchema = z.object({
  userId: z.string().min(1),
  shippingPrice: z.number().nonnegative().default(0),
  discountedPrice: z.number().nonnegative().default(0),
  discount: z.number().nonnegative().default(0),
  taxPrice: z.number().nonnegative().default(0),
  totalPrice: z.number().nonnegative().default(0),
  items: z.array(z.string().length(24)),
});
