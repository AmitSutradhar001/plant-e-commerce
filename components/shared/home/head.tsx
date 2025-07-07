"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

export default function Head() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });
  const controls = useAnimation();

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [inView, controls]);

  const textVariants = {
    hidden: { x: -100, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.8 } },
  };

  const imageVariants = {
    hidden: { x: 100, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.8 } },
  };

  return (
    <>
      <section
        ref={ref}
        className="w-full px-6 py-12 md:py-20 bg-white dark:bg-black text-black dark:text-white"
      >
        <div className="flex flex-col md:flex-row items-center justify-between gap-10">
          {/* Left Content (Text) */}
          <motion.div
            variants={textVariants}
            initial="hidden"
            animate={controls}
            className="flex-1 flex flex-col justify-center items-start px-5"
          >
            <h1 className="text-4xl sm:text-5xl font-semibold leading-tight mb-4">
              Find perfect plants
              <br />
              for your home
            </h1>
            <p className="text-gray-600 dark:text-gray-300 text-lg mb-6">
              Beautiful plants that encourage you to get creative.
            </p>
            <Link href="/plants" className="cursor-pointer">
              <div className="relative cursor-pointer w-[144px] h-[48px] overflow-hidden flex items-center justify-center rounded-md group">
                {/* Button on top */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{
                    repeat: Infinity,
                    duration: 2, // Adjust speed as needed
                    ease: "easeInOut",
                    repeatType: "loop",
                  }}
                  className="absolute w-full h-full  bg-gradient-to-r from-cyan-500 to-pink-600"
                />

                <button className="relative cursor-pointer z-10 w-[138px] h-[42px] text-white dark:text-black bg-black dark:bg-white rounded-md text-sm uppercase tracking-wide font-medium">
                  Shop Now
                </button>
              </div>
            </Link>
          </motion.div>

          {/* Right Content (Image) */}
          <motion.div
            variants={imageVariants}
            initial="hidden"
            animate={controls}
            className="flex-1 flex justify-center items-center"
          >
            <Image
              src="/images/hero-plant-1.png"
              alt="Hero Image"
              width={600}
              height={500}
              className="w-96 h-auto object-cover rounded-md"
            />
          </motion.div>
        </div>
      </section>
    </>
  );
}
