import React from "react";
import Metadata from "@/components/layout/metadata/Metadata";
import AboutHeroSection from "@/pages/About/components/AboutHeroSection";
import StatSection from "@/pages/About/components/StatSection";
import StorySection from "@/pages/About/components/StorySection";
import HowToOrderSection from "@/pages/About/components/HowToOrderSection";
import ChooseUsSection from "@/pages/About/components/ChooseUsSection";
import TestimonialSection from "@/pages/About/components/TestimonialSection";
import ExploreSection from "@/pages/About/components/ExploreSection";

const About = () => {
  return (
    <>
      <Metadata title="About Us - World of Minifigs" />
      <AboutHeroSection />
      <StatSection />
      <StorySection />
      <HowToOrderSection />
      <ChooseUsSection />
      <TestimonialSection />
      <ExploreSection />
    </>
  );
};

export default About;
