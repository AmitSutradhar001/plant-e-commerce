"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useAnimation, useTime, useTransform } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import SplitText from "@/components/ui/SplitText";
import BlurText from "@/components/ui/BlurTextProps";

export default function Head() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });
  const controls = useAnimation();
  const time = useTime();
  const rotate = useTransform(time, [0, 3000], [0, 360], {
    clamp: false,
  });
  const rotatingBg = useTransform(rotate, (r) => {
    return `conic-gradient(from ${r}deg, #ff4545, #00ff99, #006aff, #ff0095, #ff4545) `;
  });
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
            <BlurText
              text="Find perfect plants for your home!"
              delay={150}
              animateBy="words"
              direction="top"
              className="text-4xl mb-3"
            />
            <SplitText
              text="Beautiful plants that encourage you to get creative."
              className="text-xl font-semibold text-center mb-5"
              delay={50}
              duration={0.6}
              ease="power3.out"
              splitType="chars"
              from={{ opacity: 0, y: 40 }}
              to={{ opacity: 1, y: 0 }}
              threshold={0.1}
              rootMargin="-100px"
              textAlign="center"
            />

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
            <motion.div
              className="w-96 h-auto object-cover rounded-md p-[3px] "
              style={{
                background: rotatingBg,
              }}
            >
              <Image
                src="/images/hero-plant-1.png"
                alt="Hero Image"
                width={600}
                height={500}
                className="w-96 h-auto object-cover rounded-md"
              />
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
