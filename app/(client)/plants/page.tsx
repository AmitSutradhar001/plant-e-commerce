"use client";

import { useEffect, useState } from "react";
import Dropdown2 from "@/components/plant/drop-down";
import Product from "@/components/plant/product";
import { getPaginatedPlants } from "@/lib/actions/plant.action";
import { PlantTypeWithId } from "@/types";
import Pagination from "@/components/plant/pagination";
import { useSearchParams } from "next/navigation";
import FullPageLoader from "@/app/loading";

type plant = {
  data: PlantTypeWithId[];
  currentPage: number;
  totalPages: number;
};

const Plants = () => {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "All Plants";
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [loading, setLoading] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [plants, setPlants] = useState<plant | null>(null);
  useEffect(() => {
    async function fetchdata() {
      try {
        setLoading(true);
        const data = await getPaginatedPlants(pageNumber, selectedCategory);
        setPlants(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    fetchdata();
  }, [selectedCategory, pageNumber]);
  if (loading) return <FullPageLoader />;
  return (
    <>
      <div className="flex justify-between items-start w-full">
        <div className="w-1/5">
          <Dropdown2
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
        </div>
        <div className="w-4/5 min-h-[500px]">
          <Product plants={plants?.data} />
        </div>
      </div>
      <Pagination
        currentPage={pageNumber}
        totalPages={plants?.totalPages}
        onPageChange={(page) => setPageNumber(page)}
      />
    </>
  );
};

export default Plants;
