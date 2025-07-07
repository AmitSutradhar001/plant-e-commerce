"use server";

import { Plant } from "@/db/schema";
import { PlantTypeWithId } from "@/types/index";
import { connectToDB } from "@/db/mongoose";

const PLANTS_PER_PAGE = 9;

export async function getPaginatedPlants(
  page: number,
  category: string
): Promise<{
  data: PlantTypeWithId[];
  currentPage: number;
  totalPages: number;
}> {
  try {
    await connectToDB();

    const skip = (page - 1) * PLANTS_PER_PAGE;

    // 🌿 Build dynamic filter
    const filter = category && category !== "All Plants" ? { category } : {};

    const totalCount = await Plant.countDocuments(filter);
    const totalPages = Math.ceil(totalCount / PLANTS_PER_PAGE);

    const plants = await Plant.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(PLANTS_PER_PAGE);

    return {
      data: JSON.parse(JSON.stringify(plants)),
      currentPage: page,
      totalPages,
    };
  } catch (error) {
    console.error("Pagination error:", error);
    return {
      data: [],
      currentPage: page,
      totalPages: 0,
    };
  }
}

export async function getPlantBySlug(slug: string) {
  try {
    await connectToDB();
    const plant = await Plant.findOne({ slug });

    return plant ? JSON.parse(JSON.stringify(plant)) : null;
  } catch (error) {
    console.error(`Error fetching plant with slug "${slug}":`, error);
    return null;
  }
}

// ✅ 1. Get minimal list of plant names for search box
export async function getAllPlantsForSearch(): Promise<
  { slug: string; name: string }[]
> {
  try {
    await connectToDB();
    const plants = await Plant.find({}, "slug name");
    return JSON.parse(JSON.stringify(plants));
  } catch (error) {
    console.error("Search fetch error:", error);
    return [];
  }
}

export async function fetchPlantsForDashboard(filters: any) {
  await connectToDB();
  const query: any = {};
  if (filters?.category && filters.category !== "All Plants")
    query.category = filters.category;
  if (filters?.name) query.name = { $regex: filters.name, $options: "i" };
  const plants = await Plant.find(query).sort({ createdAt: -1 });
  return JSON.parse(JSON.stringify(plants));
}
