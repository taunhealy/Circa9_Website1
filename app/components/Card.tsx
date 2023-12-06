"use client";

// Card.tsx
import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Image from "next/image";
import "./card.scss";

interface DataProp {
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
}

interface CardProps {
  itemsData: DataProp[];
}

interface FadeInWhenVisibleProps {
  children: React.ReactNode;
  index: number;
}

const FadeInWhenVisible: React.FC<FadeInWhenVisibleProps> = ({
  children,
  index,
}) => {
  const controls = useAnimation();
  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  return (
    <motion.div
      ref={ref}
      animate={controls}
      initial="hidden"
      variants={{
        visible: (index) => ({
          opacity: 1,
          y: 0,
          transition: {
            duration: index / 4 + 0.7,
            ease: "easeInOut",
            delay: (index / index / 3) * 0.03,
          }, // Adjust delay
        }),
        hidden: { opacity: 0, y: 20 },
      }}
      custom={index}
    >
      {children}
    </motion.div>
  );
};

const Card: React.FC<CardProps> = ({ itemsData }) => {
  return (
    <div className="card-container">
      <div className="card">
        {itemsData.map((item, index) => (
          <FadeInWhenVisible key={item.id} index={index}>
            <div className="card-item">
              <div className="card-image-container">
                <motion.div
                  className="card-image"
                  initial={{ opacity: 0.45 }}
                  whileHover={{ opacity: 1, transition: { duration: 0.05 } }}
                >
                  <Image
                    src={item.img}
                    alt={item.title}
                    layout="fill"
                    objectFit="cover"
                  />
                </motion.div>
              </div>
              <div className="card-content">
                <div className="card-title">{item.title}</div>
                {/* Add other content as needed */}
              </div>
            </div>
          </FadeInWhenVisible>
        ))}
      </div>
    </div>
  );
};

export default Card;
