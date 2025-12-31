'use server';

import Harapan from "../module/harapan";
import connectDB from "../lib/mongodb";

export async function getAllHarapanService(page = 1, limit = 14) {
  try {
    await connectDB();

    const skip = (page - 1) * limit;

    const rawData = await Harapan.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    const data = rawData.map(item => ({
      _id: item._id.toString(),
      sender: item.sender,
      msg: item.msg,
      createdAt: item.createdAt.toISOString(),
      updatedAt: item.updatedAt.toISOString(),
    }));

    const total = await Harapan.countDocuments();

    return {
      success: true,
      total,
      data,
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
}
