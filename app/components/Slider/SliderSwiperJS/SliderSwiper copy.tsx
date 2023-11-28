"use client";

import React, { useRef, useState, useMemo, useEffect } from "react";
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
  const sortingRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [filteredItems, setFilteredItems] = useState<Item[]>(items);
  const [selectedBrand, setSelectedBrand] = useState<string | null>("Recent");

  // Set "Recent" as default upon page load
  useEffect(() => {
    setSelectedBrand("Recent");
  }, []);

  // Get unique brands including "Recent"
  const brands = useMemo(() => {
    const brandsArray: string[] = [];

    items.forEach((item) => {
      if (item.brand !== "all" && !brandsArray.includes(item.brand)) {
        brandsArray.push(item.brand);
      }
    });

    return ["Recent", ...brandsArray];
  }, [items]);

  // Get filtered and sorted items based on the selected brand
  const getFilteredItems = (brand: string | null): Item[] => {
    if (brand === "Recent") {
      // Filter out items without a valid date and then sort
      const validDateItems = items.filter((item) => item.date);
      return validDateItems
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, 9); // Cap at 9 items for Recent
    } else {
      return items.filter((item) => item.brand === brand);
    }
  };

  const handleFilterChange = (brand: string | null): void => {
    setSelectedBrand(brand);
    const newFilteredItems = getFilteredItems(brand);
    setFilteredItems(newFilteredItems);
    // Reset the current index to 0 when the brand changes
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

  return (
    <>
      <div ref={sortingRef}>
        <section className="item-background-container">
          {filteredItems.length > 0 && (
            <div key={filteredItems[currentIndex].id} className="item-wrapper">
              <div className="item-image-container">
                <img
                  className="item-image"
                  src={filteredItems[currentIndex].img}
                  alt={filteredItems[currentIndex].title}
                />
              </div>
              <section className="item-titles">
                <div className="brand-title">
                  {filteredItems[currentIndex].brand}
                </div>
                <div className="item-title">
                  {filteredItems[currentIndex].title}
                </div>
              </section>
              {/* ... rest of your item rendering code ... */}
            </div>
          )}
      
        <section className="brand-filter-sidebar">
          {brands.map((brand) => (
            <button
              className="brand-filter-buttons "
              key={brand}
              onClick={() => handleFilterChange(brand)}
            >
              {brand}
            </button>
          ))}
        </section>
        <div className="nextprev-button-wrapper">
          <button
            type="button"
            className="button-prev"
            onClick={handlePrevItem}
          >
            Previous
          </button>
          <button
            type="button"
            className="button-next"
            onClick={handleNextItem}
          >
            Next
          </button>
         
        </div>
        </section>
      </div>
      
    </>
  );
};

export default SliderSwiper;
