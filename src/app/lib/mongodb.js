import mongoose from "mongoose";

const dbUsername = 'admin';
const dbPassword = 'IQEZN5WT5NYN28XA';
const dbLink = 'dono-03.danbot.host:4904';

const MONGODB_URI = `mongodb://${dbUsername}:${dbPassword}@${dbLink}?retryWrites=true&w=majority`;

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export default async function connectDB() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI);
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
