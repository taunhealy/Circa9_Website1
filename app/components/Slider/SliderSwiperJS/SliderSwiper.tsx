"use client";

// Import React, useState, useMemo, useEffect
import React, { useState, useMemo, useEffect } from "react";
// Import motion and AnimatePresence from framer-motion
import { motion, AnimatePresence } from "framer-motion";
// Import your styles
import "./sliderswiper.scss";
// Import the necessary components
import BrandFilterButton from "../../Buttons/BrandFilterButtons";
import Cursor from "../../Cursors/Cursor";
import ItemLines from "../../ItemLines/ItemLines";
// Import the necessary components from Mux
import MuxVideoPlayer from "../../MuxVideo/MuxVideoPlayer";

// Define interfaces for Item and SliderProps
interface Item {
  id: number;
  title: string;
  brand: string;
  img: string;
  desc: string;
  director: string;
  production: string;
  cinematographer: string;
  editor: string;
  date: string;
  videoUrl: string;
  muxAssetId: string;
  videoTitle: string;
  muxPlaybackId: string;
  video_id: string;
  playbackId: string;
}

interface SliderProps {
  items: Item[];
}

// Define the SliderSwiperWrapper component
const SliderSwiperWrapper: React.FC<SliderProps> = ({ items }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedBrand, setSelectedBrand] = useState<string | null>("Recent");
  const [filterButtonsVisible, setFilterButtonsVisible] = useState(true);
  const [showCursor, setShowCursor] = useState(false);

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

  useEffect(() => {
    setFilterButtonsVisible(false);

    const timeoutId = setTimeout(() => {
      setFilterButtonsVisible(true);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [selectedBrand]);

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

  const brandFilterAnimation = {
    initial: { opacity: 0, y: -10 },
    hidden: { opacity: 0, y: 0 },
    show: {
      transition: {
        staggerChildren: 0.34,
        duration: 1.7,
      },
      opacity: 1,
      y: 0,
    },
    exit: {
      opacity: 0,
      y: 0,
      transition: {
        ease: "easeInOut",
        duration: 1,
      },
    },
  };

  return (
    <div className="item-background-container">
      <AnimatePresence mode="wait">
        <motion.section
          key={selectedBrand}
          className="item-titles"
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 0 }}
          transition={{ duration: 1.5 }}
        >
          {showCursor && <Cursor setShowCursor={setShowCursor} key="cursor" />}
          <div className="brand-title">{filteredItems[currentIndex].brand}</div>
          <div className="item-title">{filteredItems[currentIndex].title}</div>
        </motion.section>
      </AnimatePresence>

      <AnimatePresence mode="wait">
        <motion.div
          className="brand-filter-sidebar"
          onMouseOver={() => setShowCursor(true)}
          onMouseLeave={() => setShowCursor(false)}
          initial="hidden"
          animate="show"
          exit="exit"
          variants={brandFilterAnimation}
          key="brand-filter"
        >
          {brands.map((brand) => (
            <BrandFilterButton
              key={brand}
              brand={brand}
              selected={brand === selectedBrand}
              onClick={() => handleFilterChange(brand)}
            />
          ))}
        </motion.div>
      </AnimatePresence>

      {filteredItems.length > 0 && (
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedBrand}
            className="item-image-container"
            initial="hidden"
            animate="show"
            exit="exit"
            variants={brandFilterAnimation}
            custom={currentIndex}
          >
            {/* Use the Video component from Mux */}
            <MuxVideoPlayer
              playbackId={filteredItems[currentIndex].playbackId}
              videoTitle={filteredItems[currentIndex].title}
            />
          </motion.div>
        </AnimatePresence>
      )}

      <AnimatePresence mode="wait">
        <motion.div
          initial="hidden"
          animate="show"
          exit="exit"
          variants={brandFilterAnimation}
          className="nextprev-button-wrapper"
        >
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
        </motion.div>
      </AnimatePresence>

      <AnimatePresence>
        {filteredItems.length > 0 && (
          <motion.div
            key="production-title"
            className="production-title-container"
            initial="hidden"
            animate="show"
            exit="exit"
            variants={brandFilterAnimation}
          >
            {filteredItems[currentIndex]?.production && (
              <div className="production-title">
                {filteredItems[currentIndex].production}
              </div>
            )}
          </motion.div>
        )}
        <motion.div
          key="item-lines"
          className="item-lines-container"
          initial="hidden"
          animate="show"
          exit="exit"
          variants={brandFilterAnimation}
        >
          <ItemLines items={filteredItems} activeIndex={currentIndex} />
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

// Export the SliderSwiperWrapper component
export default SliderSwiperWrapper;
