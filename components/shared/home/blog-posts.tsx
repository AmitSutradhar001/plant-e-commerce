"use client";

import Image from "next/image";
import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

const blogPosts = [
  {
    title: "How to water your freaking plants so they don't die after one week",
    author: "Mellissa Bail",
    edition: "Edition 291",
    image: "/images/blog/Image1.png",
  },
  {
    title: "How to repot a Monstera without killing it and foster its growth",
    author: "Jesse Rowe",
    edition: "Edition 292",
    image: "/images/blog/Image2.png",
  },
];

const BlogPosts = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.5 });
  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [inView, controls]);

  const left = {
    hidden: { x: -100, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.8 } },
  };

  const right = {
    hidden: { x: 100, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.8 } },
  };
  return (
    <section ref={ref} className="max-w-5xl mx-auto px-4 py-16">
      <div className="grid md:grid-cols-2 gap-10">
        {blogPosts.map((post, index) => (
          <motion.div
            key={index}
            className="space-y-4"
            initial="hidden"
            animate={controls}
            variants={index % 2 === 0 ? left : right}
          >
            {/* Image with Author Tag */}
            <div className="relative w-full aspect-[3/2] overflow-hidden rounded-md">
              <Image
                src={post.image}
                alt={post.title}
                width={600}
                height={400}
                className="w-full h-full object-cover"
              />
              <div className="absolute flex flex-col rounded-md bottom-4 right-4 bg-white/40 bg-opacity-90 px-3 py-1 text-sm">
                <span className="text-gray-900">Written by </span>
                <span className="text-black font-medium">{post.author}</span>
              </div>
            </div>

            {/* Edition + Title */}
            <p className="text-sm text-gray-500">{post.edition}</p>
            <h3 className="text-xl font-serif leading-snug">{post.title}</h3>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default BlogPosts;
