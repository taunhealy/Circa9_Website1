import React from "react";
import SliderSwiper from "./components/Slider/SliderSwiperJS/SliderSwiper";
import ItemsData from "@/app/data/data";
import "@/styles/layouts.css";
import Card from "@/app/components/Card";
import "./data/data";
import "./page";

function Page() {
  return (
    <div>
      <SliderSwiper items={ItemsData} />
      <Card itemsData={ItemsData} />
    </div>
  );
}

export default Page;
