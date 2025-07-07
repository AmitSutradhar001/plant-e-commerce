"use client";

import Image from "next/image";
import React from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

const products = [
  {
    name: "Plant 1",
    price: "150€",
    image: "/images/featured/image1.png",
    soldOut: false,
  },
  {
    name: "Plant 2",
    price: "70€",
    image: "/images/featured/image2.png",
    soldOut: false,
  },
  {
    name: "Plant 3",
    price: "50€",
    image: "/images/featured/image3.png",
    soldOut: true,
  },
];

const FeaturedProducts = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const controls = useAnimation();
  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [inView, controls]);

  const top = {
    hidden: { y: 100, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.8 } },
  };
  const bottom = {
    hidden: { y: -100, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.8 } },
  };

  return (
    <section ref={ref} className="py-16 px-4 max-w-7xl mx-auto">
      {/* Top Quote */}
      <h2 className="text-center text-2xl md:text-3xl font-serif mb-16">
        Love and work are to people what water and <br /> sunshine are to plants
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 items-start px-5">
        {/* Featured Text */}
        <motion.div
          variants={bottom}
          initial="hidden"
          animate={controls}
          className="space-y-6"
        >
          <h3 className="text-2xl font-serif">Featured</h3>
          <p className="text-sm text-gray-700 max-w-xs">
            Our plants are 100% organic, we don&apos;t use pesticides or harmful
            chemicals.
          </p>
          <p className="text-sm text-gray-500 italic">
            But please don&apos;t eat them
          </p>
          <button className="border-b-2 shadow-2xl px-4 py-2 mt-2 hover:bg-gray-200 dark:hover:bg-gray-700 transition">
            Shop all Favourites
          </button>
        </motion.div>

        {/* Product Cards */}
        {products.map((product, index) => (
          <motion.div
            key={index}
            className="space-y-2 relative p-2 rounded-md shadow-sm bg-white dark:bg-gray-800"
            initial="hidden"
            variants={index % 2 === 0 ? top : bottom}
            animate={controls}
          >
            <div className="aspect-[3/4] bg-gray-100 rounded-md overflow-hidden">
              <Image
                width={400}
                height={400}
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {product.soldOut && (
                <span className="absolute top-2 right-2 bg-black text-white text-xs px-2 py-1 rounded">
                  Sold Out
                </span>
              )}
            </div>
            <p className="text-sm text-gray-600">{product.name}</p>
            <p className="text-lg font-medium">{product.price}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedProducts;
