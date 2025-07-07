import Card from "./card";
import { PlantTypeWithId } from "@/types/index";

export default function Product({
  plants,
}: {
  plants: PlantTypeWithId[] | null | undefined;
}) {
  return (
    <div className="">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {plants?.map((product) => (
            <Card key={product._id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
