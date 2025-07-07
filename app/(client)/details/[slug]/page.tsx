import PlantGallery from "@/components/details/plant-gallery";
import ProductDetails from "@/components/details/product-details";
import { getPlantBySlug } from "@/lib/actions/plant.action"; // the function we wrote earlier

type Props = {
  params: {
    slug: string;
  };
};

const PlantDetailsPage = async ({ params }: Props) => {
  const { slug } = await params;

  const plant = await getPlantBySlug(slug);

  if (!plant) {
    return (
      <div className="text-center py-20 text-red-600">Plant not found</div>
    );
  }
  return (
    <section className="flex flex-col lg:flex-row gap-5 p-4 py-20 px-10 mx-auto">
      <div className="w-full lg:w-1/2">
        <PlantGallery images={plant.images} />
      </div>
      <div className="lg:w-1/2 w-full">
        <ProductDetails plant={plant} />
      </div>
    </section>
  );
};

export default PlantDetailsPage;
