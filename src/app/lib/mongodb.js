import mongoose from "mongoose";

const MONGODB_URI = `mongodb://${process.env.IYAH}:${process.env.PASS}@${process.env.LINK}?authSource=admin`;

// Aktifkan debug untuk melihat query / connection
mongoose.set("debug", true);

export default async function connectDB() {
  try {
    console.log(
      "🔌 Trying MongoDB:",
      MONGODB_URI.replace(/:.+@/, ":***@") // sembunyikan password di log
    );

    const conn = await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 5000,
      bufferCommands: false, // cegah buffering error jika DB belum siap
    });

    console.log("✅ MongoDB CONNECTED");
    return conn;
  } catch (err) {
    console.error("❌ MONGODB ERROR FULL:", err);
    throw err;
  }
}
