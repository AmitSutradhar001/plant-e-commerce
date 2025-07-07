// lib/mongoose.ts
import mongoose from "mongoose";

const MONGODB_URI = process.env.DATABASE_URL!;

if (!MONGODB_URI) {
  throw new Error(
    "❌ Please define the DATABASE_URL environment variable in your .env file."
  );
}

// Define a global type for the cached connection
interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}
declare global {
  // eslint-disable-next-line no-var
  var mongoose: MongooseCache | undefined;
}

const globalCache = globalThis.mongoose || {
  conn: null,
  promise: null,
};

globalThis.mongoose = globalCache;

export async function connectToDB(): Promise<typeof mongoose> {
  if (globalCache.conn) return globalCache.conn;

  if (!globalCache.promise) {
    globalCache.promise = mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
      dbName: "plant-e-com", // you can remove this if already in the URI
    });
  }

  globalCache.conn = await globalCache.promise;
  return globalCache.conn;
}
