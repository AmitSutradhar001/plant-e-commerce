"use client";

import { useState, useEffect } from "react";
import { Search, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type PlantType = {
  slug: string;
  name: string;
};

type Props = {
  allPlants: PlantType[]; // full plant list from parent
  onSelect: (plant: PlantType) => void; // what to do on select
};

const SearchBox = ({ allPlants, onSelect }: Props) => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [filteredPlants, setFilteredPlants] = useState<PlantType[]>([]);

  useEffect(() => {
    if (query.trim()) {
      const lower = query.toLowerCase();
      const matches = allPlants.filter((plant) =>
        plant.name.toLowerCase().includes(lower)
      );
      setFilteredPlants(matches);
    } else {
      setFilteredPlants([]);
    }
  }, [query, allPlants]);

  const handleBlur = () => {
    setTimeout(() => {
      setSearchOpen(false);
      setQuery("");
      setFilteredPlants([]);
    }, 100); // Delay to allow click
  };

  // Responsive: show overlay on mobile, inline on desktop/tablet
  return (
    <div className="relative">
      {/* Search icon button always visible */}
      {!searchOpen && (
        <button
          onClick={() => setSearchOpen(true)}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition"
        >
          <Search size={18} />
        </button>
      )}

      {/* Desktop/tablet search (inline) */}
      <AnimatePresence>
        {searchOpen && (
          <>
            {/* Mobile overlay */}
            <div className="fixed inset-0 z-50 flex items-start justify-center md:hidden bg-black/40 dark:bg-black/70 backdrop-blur-sm">
              <motion.div
                initial={{ y: -40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -40, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="w-full max-w-md mt-10 bg-white dark:bg-gray-900 rounded-lg shadow-lg p-4 relative"
              >
                <button
                  className="absolute top-2 right-2 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
                  onClick={() => setSearchOpen(false)}
                  aria-label="Close search"
                >
                  <X size={20} />
                </button>
                <input
                  type="text"
                  placeholder="Search plants..."
                  autoFocus
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full pl-8 pr-4 py-2 bg-gray-100 dark:bg-gray-800 text-sm text-black dark:text-white rounded-md outline-none"
                />
                <Search className="absolute left-6 top-7 h-4 w-4 text-gray-400" />
                {filteredPlants.length > 0 && (
                  <ul className="absolute left-0 right-0 mt-2 bg-white dark:bg-gray-800 rounded-md shadow-lg max-h-60 overflow-y-auto z-50">
                    {filteredPlants.map((plant) => (
                      <li
                        key={plant.slug}
                        onMouseDown={() => {
                          onSelect(plant);
                          setSearchOpen(false);
                        }}
                        className="px-4 py-2 text-sm cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700"
                      >
                        {plant.name}
                      </li>
                    ))}
                  </ul>
                )}
              </motion.div>
            </div>

            {/* Desktop/tablet inline search */}
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 220, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="relative hidden md:block"
            >
              <input
                type="text"
                placeholder="Search plants..."
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onBlur={handleBlur}
                className="w-full pl-8 pr-4 py-2 bg-gray-100 dark:bg-gray-800 text-sm text-black dark:text-white rounded-md outline-none"
              />
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
              {filteredPlants.length > 0 && (
                <ul className="absolute z-50 mt-1 w-full bg-white dark:bg-gray-800 rounded-md shadow-lg max-h-60 overflow-y-auto">
                  {filteredPlants.map((plant) => (
                    <li
                      key={plant.slug}
                      onMouseDown={() => onSelect(plant)}
                      className="px-4 py-2 text-sm cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700"
                    >
                      {plant.name}
                    </li>
                  ))}
                </ul>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SearchBox;
