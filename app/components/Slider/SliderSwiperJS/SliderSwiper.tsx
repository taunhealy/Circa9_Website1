import React, { useState, useMemo, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
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

  const itemTitlesRef = useRef<NodeListOf<Element> | null>(null);
  const itemImageRef = useRef<HTMLImageElement | null>(null);
  const buttonPrevRef = useRef<HTMLButtonElement | null>(null);
  const buttonNextRef = useRef<HTMLButtonElement | null>(null);
  const brandFilterButtonsRef = useRef<NodeListOf<Element> | null>(null);

  useLayoutEffect(() => {
    // Store refs to elements
    itemTitlesRef.current = document.querySelectorAll(".item-titles");
    itemImageRef.current = document.querySelector(".item-image");
    buttonPrevRef.current = document.querySelector(".button-prev");
    buttonNextRef.current = document.querySelector(".button-next");
    brandFilterButtonsRef.current = document.querySelectorAll(
      ".brand-filter-buttons"
    );
  }, []);

  useLayoutEffect(() => {
    // Create a context for all GSAP animations and ScrollTriggers
    const ctx = gsap.context(() => {
      const timeline = gsap.timeline({ defaults: { ease: "power3.out" } });

      const randomEase = gsap.utils.random([
        "power1.inOut",
        "power2.inOut",
        "power3.inOut",
      ]);
      const randomDelay = gsap.utils.random(0.1, 0.7); // Adjust the range as needed

      timeline.fromTo(
        itemTitlesRef.current,
        { opacity: 0, y: 0 },
        { opacity: 1, y: 0, duration: 1.3, ease: randomEase },
        "start"
      );

      timeline.fromTo(
        itemImageRef.current,
        { opacity: 0, y: 7 },
        { opacity: 1, y: 0, duration: 1.8, ease: randomEase },
        "start+=0.2"
      );

      timeline.fromTo(
        buttonPrevRef.current,
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 1.5, stagger: 0.1, ease: randomEase },
        "start+=0.5"
      );

      timeline.fromTo(
        buttonNextRef.current,
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.3, stagger: 0.1, ease: randomEase },
        "start+=0.5"
      );

      timeline.fromTo(
        brandFilterButtonsRef.current,
        { opacity: 0.6, y: 0 },
        { opacity: 1, y: 0, duration: 0.3, ease: randomEase },
        "start+=0.5"
      );
    }, [currentIndex]); // Only re-run the animation when currentIndex changes

    return () => ctx.revert(); // Cleanup
  }, [currentIndex, filteredItems]);

  const handleFilterChange = (brand: string | null): void => {
    setSelectedBrand(brand);
    setCurrentIndex(0);
    // The animations will be triggered in the useLayoutEffect
  };

  const handleNextItem = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % filteredItems.length);
    // The animations will be triggered in the useLayoutEffect
  };

  const handlePrevItem = () => {
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex - 1 + filteredItems.length) % filteredItems.length
    );
    // The animations will be triggered in the useLayoutEffect
  };

  return (
    <div className="item-background-container">
      {filteredItems.length > 0 && (
        <section className="item-titles">
          <div className="brand-title">{filteredItems[currentIndex].brand}</div>
          <div className="item-title">{filteredItems[currentIndex].title}</div>
        </section>
      )}
      <div className="brand-filter-sidebar">
        {brands.map((brand) => (
          <button
            key={brand}
            className={`brand-filter-buttons ${
              selectedBrand === brand ? "active" : ""
            }`}
            onClick={() => handleFilterChange(brand)}
          >
            {brand}
          </button>
        ))}
      </div>
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
        <button type="button" className="button-prev" onClick={handlePrevItem}>
          <img src="/arrows/left-chevron-svgrepo-com.svg" alt="Previous" />
        </button>
        <button type="button" className="button-next" onClick={handleNextItem}>
          <img src="/arrows/right-chevron-svgrepo-com.svg" alt="Next" />
        </button>
      </div>
    </div>
  );
};

export default SliderSwiper;
