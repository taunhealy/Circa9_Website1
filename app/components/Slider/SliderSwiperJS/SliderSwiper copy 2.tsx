"use client";

import React, { useRef, useState, useMemo, useEffect } from "react";
import "./sliderswiper.css";
import gsap from "gsap";
import { useLayoutEffect } from "react";

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
    const brandsArray: string[] = Array.from(
      new Set(
        items.filter((item) => item.brand !== "all").map((item) => item.brand)
      )
    );

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
    // Fade out the current content
    gsap.to([".item-titles", ".item-image"], {
      opacity: 0,
      duration: 0.7,
      ease: "power3.out",
      onComplete: () => {
        // Change the selected brand and filtered items after the fade-out is complete
        setSelectedBrand(brand);
        const newFilteredItems = getFilteredItems(brand);
        setFilteredItems(newFilteredItems);
        // Reset the current index to 0 when the brand changes
        setCurrentIndex(0);
        // Fade in the new content
        gsap.to([".item-titles", ".item-image"], {
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
        });
      },
    });
  };

  const handleNextItem = () => {
    // Fade out the current image
    gsap.to([".item-titles", ".item-image"], {
      opacity: 0,
      duration: 0.3,
      ease: "power3.out",
      onComplete: () => {
        // Change the current index after the fade-out is complete
        setCurrentIndex((prevIndex) => (prevIndex + 1) % filteredItems.length);
        // Fade in the new image
        gsap.to([".item-titles", ".item-image"], {
          opacity: 1,
          duration: 2.3,
          ease: "power3.out",
        });
      },
    });
  };

  const handlePrevItem = () => {
    // Fade out the current image
    gsap.to([".item-image", ".item-titles"], {
      opacity: 0,
      duration: 0.3,
      ease: "power3.out",
      onComplete: () => {
        // Change the current index after the fade-out is complete
        setCurrentIndex(
          (prevIndex) =>
            (prevIndex - 1 + filteredItems.length) % filteredItems.length
        );
        // Fade in the new image
        gsap.to([".item-image", ".item-titles"], {
          opacity: 1,
          duration: 0.3,
          ease: "power3.out",
        });
      },
    });
  };

  const buttonRef = useRef<HTMLButtonElement>(null);

  useLayoutEffect(() => {
    gsap.fromTo(
      [".item-image"],
      { opacity: 0, y: 0 },
      { opacity: 1, y: 0, duration: 2.75, ease: "power3.out", stagger: 0.3 }
    );
  }, [filteredItems, currentIndex]);

  return (
    <div className="item-background-container">
      <div className="brand-filter-sidebar">
        {brands.map((brand) => (
          <button
            className={`brand-filter-buttons ${
              selectedBrand === brand ? "active" : ""
            }`}
            ref={buttonRef}
            key={brand}
            onClick={() => handleFilterChange(brand)}
          >
            {brand}
          </button>
        ))}
      </div>

      <div className="item-content-container">
        {filteredItems.length > 0 && (
          <section className="item-titles">
            <div className="brand-title">
              {filteredItems[currentIndex].brand}
            </div>
            <div className="item-title">
              {filteredItems[currentIndex].title}
            </div>
          </section>
        )}
        <div className="item-image-container">
          {filteredItems.length > 0 && (
            <img
              className="item-image"
              src={filteredItems[currentIndex].img}
              alt={filteredItems[currentIndex].title}
            />
          )}
        </div>
        <div className="nextprev-button-wrapper">
          <button
            type="button"
            ref={buttonRef}
            className="button-prev"
            onClick={handlePrevItem}
          >
            <img
              src="/arrows/left-chevron-svgrepo-com.svg" // Adjust the path based on your file structure
              alt="Previous"
            />
          </button>
          <button
            type="button"
            className="button-next"
            onClick={handleNextItem}
            ref={buttonRef}
          >
            <img
              src="/arrows/right-chevron-svgrepo-com.svg" // Adjust the path based on your file structure
              alt="Next"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SliderSwiper;
