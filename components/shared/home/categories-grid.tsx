"use client";

import Image from "next/image";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import Link from "next/link";

const CategooriesGrid = () => {
  const categories = [
    { title: "Jungle Plants", image: "/images/categories/Image1.png" },
    { title: "Outdoor Plants", image: "/images/categories/Image2.png" },
    { title: "Bedroom Plants", image: "/images/categories/Image3.png" },
    { title: "Indoor Plants", image: "/images/categories/Image4.png" },
  ];
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });
  const controls = useAnimation();

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [inView, controls]);

  const imageVariants = {
    hidden: { scale: 0 },
    visible: { scale: 1, transition: { duration: 0.8 } },
    hovorEnd: { scale: 1, transition: { duration: 0.2 } },
    hover: { scale: 1.1, transition: { duration: 0.2 } },
  };

  return (
    <section ref={ref} className="py-12 px-4">
      <h2 className="text-3xl font-serif text-center mb-10">Categories</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {categories.map((category, index) => (
          <Link
            href={`/plants?category=${encodeURIComponent(category.title)}`}
            key={index}
            className="text-center space-y-3"
          >
            <motion.div
              variants={imageVariants}
              initial="hidden"
              animate={controls}
              whileHover={{ scale: 1.1 }}
              onHoverEnd={() => controls.start("hovorEnd")}
              transition={{ duration: 0.2 }}
              className="w-full aspect-[3/4] overflow-hidden rounded-md shadow-md cursor-pointer"
            >
              <Image
                src={category.image}
                alt={category.title}
                width={400}
                height={400}
                className="w-full h-full object-cover"
              />
            </motion.div>
            <p className="text-lg font-light">{category.title}</p>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default CategooriesGrid;
