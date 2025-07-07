import Image from "next/image";
import Link from "next/link";
import { PlantTypeWithId } from "@/types/index";

const Card = ({ product }: { product: PlantTypeWithId }) => {
  return (
    <div
      key={product._id}
      className="group relative bg-white dark:bg-gray-900 rounded-lg shadow-md overflow-hidden transition hover:shadow-lg"
    >
      <Image
        src={product.images?.[0] || "/placeholder.jpg"}
        alt={product.name}
        width={400}
        height={400}
        className="aspect-square w-full object-cover transition group-hover:opacity-80"
      />

      <div className="p-4">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
          <Link href={`/details/${product.slug}`}>
            <span aria-hidden="true" className="absolute inset-0" />
            {product.name}
          </Link>
        </h3>

        {product.category && (
          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
            {product.category}
          </p>
        )}

        <div className="mt-2 flex items-center justify-between">
          <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
            ${product.price}
          </p>
          <div className="flex items-center space-x-1">
            <span className="text-yellow-500 text-xs">★</span>
            <span className="text-sm text-gray-700 dark:text-gray-300">
              {product.rating.toFixed(1)}{" "}
              <span className="text-xs text-gray-400 dark:text-gray-500">
                ({product.numReviews})
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
