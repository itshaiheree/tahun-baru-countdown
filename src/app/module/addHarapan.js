/**
 * Tambah harapan baru
 * @param {string} sender
 * @param {string} msg
 */

'use server';

import Harapan from "./harapan";
import connectDB from "../lib/mongodb";

export async function addHarapan(sender, msg) {
  if (!sender || !msg) {
    return {
      success: false,
      message: "sender dan msg wajib diisi",
    };
  }

  try {
  await connectDB();

    const newHarapan = await Harapan.create({
      sender,
      msg,
    });

    // setelah create berhasil
if (typeof window !== "undefined") {
  window.dispatchEvent(new Event("harapan:updated"));
}


      return {
    _id: newHarapan._id.toString(),
    sender: newHarapan.sender,
    msg: newHarapan.msg,
    createdAt: newHarapan.createdAt.toISOString(),
  };
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
}
