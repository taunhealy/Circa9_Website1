import React, { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./sliderswiper.css";

interface Item {
  id: number;
  title: string;
  img: string;
  date: string;
  brand: string;
  desc?: string;
  director?: string;
  producer?: string;
  cinematographer?: string;
}

interface SliderProps {
  items: Item[];
}

const SliderSwiper: React.FC<SliderProps> = ({ items }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedBrand, setSelectedBrand] = useState<string | null>("Recent");
  const brands = useMemo(() => {
    const uniqueBrands = Array.from(
      new Set(
        items.filter((item) => item.brand !== "all").map((item) => item.brand)
      )
    );
    return ["Recent", ...uniqueBrands];
  }, [items]);

  const filteredItems = useMemo(() => {
    if (selectedBrand === "Recent") {
      const validDateItems = items.filter((item) => item.date);
      return validDateItems
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, 9);
    } else {
      return items.filter((item) => item.brand === selectedBrand);
    }
  }, [selectedBrand, currentIndex]);

  const handleFilterChange = (brand: string | null): void => {
    setSelectedBrand(brand);
    setCurrentIndex(0);
  };

  const handleNextItem = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % filteredItems.length);
  };

  const handlePrevItem = () => {
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex - 1 + filteredItems.length) % filteredItems.length
    );
  };

  useEffect(() => {
    // Perform cleanup when component unmounts
    return () => {
      // Your cleanup logic here
    };
  }, []);

  return (
    <div className="item-background-container">
      <AnimatePresence mode="wait">
        {filteredItems.length > 0 && (
          <motion.section
            key={currentIndex}
            className="item-titles"
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="brand-title">
              {filteredItems[currentIndex].brand}
            </div>
            <div className="item-title">
              {filteredItems[currentIndex].title}
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      <div className="brand-filter-sidebar">
        {brands.map((brand) => (
          <motion.button
            key={brand}
            className={`brand-filter-buttons ${
              selectedBrand === brand ? "active" : ""
            }`}
            onClick={() => handleFilterChange(brand)}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.5 }}
          >
            {brand}
          </motion.button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {filteredItems.length > 0 && (
          <motion.div
            key={currentIndex}
            className="item-image-container"
            initial={{ opacity: 0, y: 7 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 0 }}
            transition={{ duration: 0.7, delay: 0 }}
          >
            <img
              className="item-image"
              src={filteredItems[currentIndex].img}
              alt={filteredItems[currentIndex].title}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="nextprev-button-wrapper">
        <button
          title="button-prev"
          type="button"
          className="button-prev"
          onClick={handlePrevItem}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24">
            <path d="M12 2a10 10 0 1 0 10 10A10.011 10.011 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8.009 8.009 0 0 1-8 8z" />
            <path d="M13.293 7.293 8.586 12l4.707 4.707 1.414-1.414L11.414 12l3.293-3.293-1.414-1.414z" />
          </svg>
        </button>
        <button
          title="button-next"
          type="button"
          className="button-next"
          onClick={handleNextItem}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24">
            <path d="M12 2a10 10 0 1 0 10 10A10.011 10.011 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8.009 8.009 0 0 1-8 8z" />
            <path d="M9.293 8.707 12.586 12l-3.293 3.293 1.414 1.414L15.414 12l-4.707-4.707-1.414 1.414z" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default SliderSwiper;
