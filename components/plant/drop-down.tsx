"use client";

import React, { useEffect, useRef, useState } from "react";

type Props = {
  selectedCategory: string;
  setSelectedCategory: (value: string) => void;
};

// Custom hook to handle clicks outside the dropdown
const useClickOutside = (handler: () => void) => {
  const domNode = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const maybeHandler = (event: MouseEvent) => {
      if (domNode.current && !domNode.current.contains(event.target as Node)) {
        handler();
      }
    };

    document.addEventListener("mousedown", maybeHandler);
    return () => {
      document.removeEventListener("mousedown", maybeHandler);
    };
  }, [handler]);

  return domNode;
};

// Dropdown Component
const Dropdown2 = ({ selectedCategory, setSelectedCategory }: Props) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const domNode = useClickOutside(() => setDropdownOpen(false));

  const handleSelect = (label: string) => {
    setSelectedCategory(label);
    setDropdownOpen(false);
  };

  return (
    <section className="md:mt-20 dark:bg-dark">
      <div className="container mx-auto">
        <div className="flex flex-wrap -mx-4">
          <div ref={domNode} className="w-full px-2 ">
            <div className="py-8 text-center">
              <div className="relative inline-block text-left min-w-44">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="bg-primary dark:bg-blue-600 flex  justify-center items-center rounded-[5px] px-5 py-[13px] text-base font-medium text-white min-w-44"
                >
                  {selectedCategory}
                  <span className="pl-4">
                    <svg
                      width={20}
                      height={20}
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="fill-current"
                    >
                      <path d="M10 14.25C9.8125 14.25 9.65625 14.1875 9.5 14.0625L2.3125 7C2.03125 6.71875 2.03125 6.28125 2.3125 6C2.59375 5.71875 3.03125 5.71875 3.3125 6L10 12.5312L16.6875 5.9375C16.9688 5.65625 17.4063 5.65625 17.6875 5.9375C17.9687 6.21875 17.9687 6.65625 17.6875 6.9375L10.5 14C10.3437 14.1563 10.1875 14.25 10 14.25Z" />
                    </svg>
                  </span>
                </button>

                <div
                  className={`bg-primary dark:bg-blue-600 shadow-md absolute left-0 z-40 mt-2 w-full rounded-md py-[10px] transition-all text-white ${
                    dropdownOpen
                      ? "top-full opacity-100 visible"
                      : "top-[110%] invisible opacity-0"
                  }`}
                >
                  {[
                    "All Plants",
                    "Jungle Plants",
                    "Bedroom Plants",
                    "Indoor Plants",
                    "Outdoor Plants",
                  ].map((category) => (
                    <DropdownItem
                      key={category}
                      label={category}
                      onClick={() => handleSelect(category)}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dropdown2;

const DropdownItem = ({
  label,
  onClick,
}: {
  label: string;
  onClick: () => void;
}) => {
  return (
    <button
      onClick={onClick}
      className="w-full text-left block py-2 px-5 text-base text-white/80 hover:text-white hover:bg-white/10 transition"
    >
      {label}
    </button>
  );
};
