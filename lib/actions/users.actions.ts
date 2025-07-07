import { User } from "@/db/schema";

export const signUpUser = () => {
  return {
    success: false,
    message: "",
  };
};

export const signInWithCredentials = () => {
  return {
    success: false,
    message: "",
  };
};

export async function isAdmin(userId: string) {
  try {
    await connectToDB();
    const user = await User.findOne({ clerkId: userId });
    return user && user.role === "admin";
  } catch (error) {
    console.error("❌ isAdmin check failed:", error);
    return false;
  }
}
