"use client";

import Image from "next/image";
import { useState } from "react";

export default function PlantGallery({ images }: { images: string[] }) {
  const [selectedImage, setSelectedImage] = useState<string>(images[0]);

  const handleImageClick = (idx: number) => {
    setSelectedImage(images[idx]);
  };

  return (
    <div className="flex max-h-screen flex-col justify-center items-center md:flex-row gap-4 md:gap-6 max-w-6xl">
      {/* Thumbnails */}
      <div className="flex md:flex-col gap-4 w-full  max-h-screen md:w-28 overflow-x-auto md:overflow-y-auto scrollbar-hide">
        {images.map((img, idx) => (
          <button
            key={idx}
            onClick={() => handleImageClick(idx)}
            className={`border-2 rounded overflow-hidden transition-all ${
              selectedImage === img
                ? "border-green-500"
                : "border-transparent hover:border-gray-400 dark:hover:border-gray-600"
            }`}
          >
            <Image
              src={img}
              alt={`Thumbnail ${idx + 1}`}
              width={500}
              height={500}
              className="object-cover w-40 h-40"
            />
          </button>
        ))}
      </div>

      {/* Main image */}
      <div className="flex-1 w-96 h-96 aspect-square relative overflow-hidden border-gray-300 dark:border-gray-700 p-5 md:p-0">
        <Image
          src={selectedImage}
          alt="Selected plant"
          width={500}
          height={500}
          className="w-96 h-96 rounded-md"
        />
      </div>
    </div>
  );
}
