'use server';

import Harapan from "../module/harapan";

/**
 * Ambil semua data harapan
 * @returns {Promise<Array>}
 */
export async function getAllHarapanService() {
  try {
    const data = await Harapan.find().sort({ createdAt: -1 });
    return {
      success: true,
      total: data.length,
      data,
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
}
