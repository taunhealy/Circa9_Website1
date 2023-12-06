// ItemLines.jsx

import React from "react";
import { motion } from "framer-motion";
import "./ItemLines.scss"; // Import the CSS file

interface ItemLinesProps {
  items: Item[];
  activeIndex: number;
}

interface Item {
  id: number;
  title: string;
  img: string;
  // ... other properties
}

const ItemLines: React.FC<ItemLinesProps> = ({ items, activeIndex }) => {
  return (
    <div className="item-lines">
      {items.map((item, index) => (
        <motion.img
          key={item.id}
          className={`item-line-image ${index === activeIndex ? "active" : ""}`}
          src={item.img}
          alt={item.title}
          initial={{ scale: 0.8, opacity: 0.2 }}
          animate={{ scale: index === activeIndex ? 1.0 : 0.8, opacity: 1 }}
        />
      ))}
    </div>
  );
};

export default ItemLines;
