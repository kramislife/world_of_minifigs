import React from "react";
import Banner from "@/components/home/Banner";
import BestSelling from "@/components/home/BestSelling";
import Collections from "@/components/home/Collections";
import FeaturedProduct from "@/components/home/FeaturedProduct";
import LatestProduct from "@/components/home/LatestProduct";
import Subscribe from "@/components/home/Subscribe";
import Metadata from "@/components/layout/Metadata/Metadata";

const Home = () => {
  return (
    <>
      <Metadata title="Homepage" />
      <div>
        <div className="lg:min-h-[90vh] bg-brand-gradient">
          <Banner />
        </div>
        <div className="lg:min-h-[90vh] bg-brand-gradient">
          <BestSelling />
        </div>
        <div className="lg:min-h-[90vh] bg-brand-gradient-r">
          <LatestProduct />
        </div>
        <div className="lg:min-h-[90vh] bg-brand-gradient">
          <FeaturedProduct />
        </div>
        <div className="lg:min-h-[90vh] bg-brand-gradient-r">
          <Collections />
        </div>
        <div className="lg:min-h-[90vh] bg-brand-gradient">
          <Subscribe />
        </div>
      </div>
    </>
  );
};

export default Home;
