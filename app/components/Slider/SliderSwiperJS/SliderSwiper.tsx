import React, { useState, useMemo, useEffect, useRef } from "react";
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
  }, [items, selectedBrand]);
  const itemTitlesRef = useRef<NodeListOf<Element> | null>(null);
  const itemImageRef = useRef<HTMLImageElement | null>(null);
  const buttonPrevRef = useRef<HTMLButtonElement | null>(null);
  const buttonNextRef = useRef<HTMLButtonElement | null>(null);
  const brandFilterButtonsRef = useRef<NodeListOf<Element> | null>(null);
  useEffect(() => {
    // Store refs to elements
    itemTitlesRef.current = document.querySelectorAll(".item-titles");
    itemImageRef.current = document.querySelector(".item-image");
    buttonPrevRef.current = document.querySelector(".button-prev");
    buttonNextRef.current = document.querySelector(".button-next");
    brandFilterButtonsRef.current = document.querySelectorAll(
      ".brand-filter-buttons"
    );
  }, []);
  const handleFilterChange = (brand: string | null): void => {
    gsap.to(
      [
        itemTitlesRef.current,
        itemImageRef.current,
        buttonPrevRef.current,
        buttonNextRef.current,
        brandFilterButtonsRef.current,
      ],
      {
        opacity: 0,
        duration: 0.3,
        ease: "power3.out",
        onComplete: () => {
          setSelectedBrand(brand);
          setCurrentIndex(0);
          animateIn();
        },
      }
    );
  };
  const animateIn = () => {
    const timeline = gsap.timeline({ defaults: { ease: "power3.out" } });
    timeline.fromTo(
      itemTitlesRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1 },
      "start"
    );
    timeline.fromTo(
      itemImageRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1 },
      "start+=0.2"
    );
    timeline.fromTo(
      buttonPrevRef.current,
      { opacity: 0, x: -20 },
      { opacity: 1, x: 0, duration: 0.3, stagger: 0.1 },
      "start+=0.5"
    );
    timeline.fromTo(
      buttonNextRef.current,
      { opacity: 0, x: -20 },
      { opacity: 1, x: 0, duration: 0.3, stagger: 0.1 },
      "start+=0.5"
    );
    timeline.fromTo(
      brandFilterButtonsRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5 },
      "start+=0.5"
    );
  };
  const handleNextItem = () => {
    gsap.to(
      [
        itemTitlesRef.current,
        itemImageRef.current,
        buttonPrevRef.current,
        buttonNextRef.current,
      ],
      {
        opacity: 0,
        duration: 0.3,
        ease: "power3.out",
        onComplete: () => {
          setCurrentIndex(
            (prevIndex) => (prevIndex + 1) % filteredItems.length
          );
          animateIn();
        },
      }
    );
  };
  const handlePrevItem = () => {
    gsap.to(
      [
        itemImageRef.current,
        itemTitlesRef.current,
        buttonPrevRef.current,
        buttonNextRef.current,
      ],
      {
        opacity: 0,
        duration: 0.3,
        ease: "power3.out",
        onComplete: () => {
          setCurrentIndex(
            (prevIndex) =>
              (prevIndex - 1 + filteredItems.length) % filteredItems.length
          );
          animateIn();
        },
      }
    );
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
