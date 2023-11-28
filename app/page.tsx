"use client";

import React from "react";
import SliderSwiper from "./components/Slider/SliderSwiperJS/SliderSwiper";
import ItemsData from "@/app/data/data";
import "@/styles/layouts.css";

function Page() {
  return (
    <div>
      <SliderSwiper items={ItemsData} />
    </div>
  );
}

export default Page;
