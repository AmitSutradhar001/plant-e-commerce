import { z } from "zod";
import {
  userZodSchema,
  addressZodSchema,
  plantZodSchema,
  cartItemZodSchema,
  cartZodSchema,
} from "./validator";

type WithId<T> = T & { _id: string };

//-------------------------------------------------------
//-------------------------------------------------------
export type UserType = z.infer<typeof userZodSchema>;
export type AddressType = z.infer<typeof addressZodSchema>;
export type PlantType = z.infer<typeof plantZodSchema>;
export type CartItemType = z.infer<typeof cartItemZodSchema>;
export type cartType = z.infer<typeof cartZodSchema>;
//-------------------------------------------------------
//-------------------------------------------------------
export type UserTypeWithId = WithId<UserType>;
export type AddressTypeWithId = WithId<AddressType>;
export type PlantTypeWithId = WithId<PlantType>;
export type CartItemTypeWithId = WithId<CartItemType>;
export type cartTypeWithId = WithId<cartType>;
