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
    { Component: Banner },
    { Component: BestSelling, className: "bg-brand-end" },
    { Component: LatestProduct, className: "bg-brand-end/70" },
    { Component: FeaturedProduct, className: "bg-brand-end" },
    { Component: Collections, className: "bg-brand-end/70" },
    // { Component: Subscribe, className: "bg-brand-end" },
  ];

  return (
    <>
      <Metadata title="Homepage" />
      <div className="bg-brand">
        {sections.map(({ Component, className }, index) => (
          <div key={index} className={className}>
            <Component />
          </div>
        ))}
      </div>
    </>
  );
};

export default Home;
