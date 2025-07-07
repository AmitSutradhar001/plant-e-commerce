import mongoose, { Schema } from "mongoose";

const AddressSchema = new Schema(
  {
    userId: { type: String, required: true },
    fullName: { type: String, required: true },
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    postalCode: { type: String, required: true },
    country: { type: String, required: true },
    landmark: { type: String },
    phone: { type: String, required: true },
  },
  { timestamps: true }
);
const UserSchema = new Schema(
  {
    clerkId: { type: String, required: true, unique: true },
    name: { type: String, default: "NO_NAME" },
    email: { type: String, required: true, unique: true },
    image: { type: String },
    role: { type: String, default: "user" },
    addresses: [{ type: Schema.Types.ObjectId, ref: "Address" }],
  },
  { timestamps: true }
);

const PlantSchema = new Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    category: { type: String, default: "unknown" },
    images: {
      type: [String],
      default: [
        "https://static.vecteezy.com/system/resources/previews/048/343/317/non_2x/cartoon-plant-logo-in-a-pot-with-a-happy-face-png.png",
      ],
    },
    banner: { type: String, required: true },
    description: { type: String, required: true },
    stock: { type: Number, default: 1 },
    price: { type: Number, default: 0 },
    discount: { type: Number, default: 0 },
    rating: { type: Number, default: 0 },
    numReviews: { type: Number, default: 0 },
    shippingPrice: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const CartSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
      unique: true,
    },
    shippingPrice: { type: Number, default: 0 },
    discount: { type: Number, default: 0 },
    taxPrice: { type: Number, default: 0 },
    totalPrice: { type: Number, default: 0 },
    discountedPrice: { type: Number, default: 0 },
    items: [{ type: Schema.Types.ObjectId, ref: "CartItem" }],
  },
  { timestamps: true }
);
const CartItemSchema = new Schema({
  plantId: { type: Schema.Types.ObjectId, ref: "Plant", required: true },
  userId: { type: String, required: true },
  cartId: { type: Schema.Types.ObjectId, ref: "Cart", required: true },
  image: { type: String, required: true },
  name: { type: String, required: true },
  banner: { type: String, required: true },
  quantity: { type: Number, required: true },
  itemPrice: { type: Number, default: 0 },
  shippingPrice: { type: Number, default: 0 },
  totalPrice: { type: Number, default: 0 },
  discount: { type: Number, default: 0 },
});

const OrderSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  // Save the full cart object directly
  cart: { type: Object, required: true },
  address: {
    fullName: String,
    street: String,
    city: String,
    state: String,
    postalCode: String,
    country: String,
    landmark: String,
    phone: String,
  },
  status: { type: String, default: "pending" },
  paymentDetails: {
    method: String,
    stripeId: String,
    paypalId: String,
    status: String,
  },
  createdAt: { type: Date, default: Date.now },
});

//------------------------------------------------
export const Cart = mongoose.models.Cart || mongoose.model("Cart", CartSchema);
export const CartItem =
  mongoose.models.CartItem || mongoose.model("CartItem", CartItemSchema);
export const Plant =
  mongoose.models.Plant || mongoose.model("Plant", PlantSchema);
export const User = mongoose.models.User || mongoose.model("User", UserSchema);
export const Address =
  mongoose.models.Address || mongoose.model("Address", AddressSchema);
export const Order =
  mongoose.models.Order || mongoose.model("Order", OrderSchema);
