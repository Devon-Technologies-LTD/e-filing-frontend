'use server'
import axios from "axios";
import { BASE_URL } from "../_constants";

const LIMIT = 6;

export async function fetchItems(id: string, dish: string, pageParam: number = 0, search: string): Promise<{
  data: unknown[];
  currentPage: number;
  nextPage: number | null;
}> {
  try {
    const res = await axios.get(`${BASE_URL}/public/${id}/menu/${dish}/dishes${search && `&search=${search}`}`, {
      params: { page: pageParam },
    });

    const items = await res.data.data;
    const slicedItems = items.slice(pageParam, pageParam + LIMIT);
    const nextPage = slicedItems.length < LIMIT ? null : pageParam + LIMIT;
    return {
      data: slicedItems,
      currentPage: pageParam,
      nextPage,
    };
  } catch (error) {
    console.error("Error fetching items:", error);
    throw new Error("Failed to fetch items");
  }
}




export const sectionId = async (id: string) => {
  try {
    const res = await axios.get(`${BASE_URL}/public/${id || 'all'}/menu?size=10000`);

    if (!res || !res.data) {
      throw new Error("Invalid response or data missing");
    }
    return res.data;

  } catch (error) {

    // @ts-ignore
    console.error(`Error fetching section with id ${id}:`, error?.message || error);

    // @ts-ignore
    throw new Error(error?.response?.data?.message || `Failed to fetch section with id ${id}`);
  }
};
