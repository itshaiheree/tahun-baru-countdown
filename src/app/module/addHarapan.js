/**
 * Tambah harapan baru
 * @param {string} sender
 * @param {string} msg
 */
import Harapan from "./harapan";

export async function addHarapan(sender, msg) {
  if (!sender || !msg) {
    return {
      success: false,
      message: "sender dan msg wajib diisi",
    };
  }

  try {
    const newHarapan = await Harapan.create({
      sender,
      msg,
    });

    return {
      success: true,
      data: newHarapan,
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
}
