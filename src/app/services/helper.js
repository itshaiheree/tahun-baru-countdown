import { getAllHarapanService } from "./harapanService";

export async function getAllHarapan() {
    try {
        return await getAllHarapanService();
    } catch (error) {
        return {
            success: false,
            message: error.message,
        };
    }
}