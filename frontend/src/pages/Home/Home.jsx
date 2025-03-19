import React from "react";
import Banner from "@/components/home/Banner";
import BestSelling from "@/components/home/BestSelling";
import Collections from "@/components/home/Collections";
import FeaturedProduct from "@/components/home/FeaturedProduct";
import LatestProduct from "@/components/home/LatestProduct";
import Subscribe from "@/components/home/Subscribe";
import Metadata from "@/components/layout/Metadata/Metadata";

const Home = () => {
  const sections = [
    { Component: Banner, gradient: "bg-brand-gradient" },
    { Component: BestSelling, gradient: "bg-brand-gradient" },
    { Component: LatestProduct, gradient: "bg-brand-gradient-r" },
    { Component: FeaturedProduct, gradient: "bg-brand-gradient" },
    { Component: Collections, gradient: "bg-brand-gradient-r" },
    { Component: Subscribe, gradient: "bg-brand-gradient" },
  ];

  return (
    <>
      <Metadata title="Homepage" />
      <div>
        {sections.map(({ Component, gradient }, index) => (
          <div key={index} className={gradient}>
            <Component />
          </div>
        ))}
      </div>
    </>
  );
};

export default Home;
