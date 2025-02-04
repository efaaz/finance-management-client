import React from "react";
import HeroSection from "../components/Landing/HeroSection";
import { FeaturesSection } from "../components/Landing/FeatureSection";

function Home() {
  return (
    <>
      <HeroSection />
      <div className="h-auto overflow-hidden w-full dark:bg-black bg-white  dark:bg-grid-small-white/[0.1] bg-grid-small-black/[0.1] relative flex items-center justify-center">
        <FeaturesSection />
      </div>
    </>
  );
}

export default Home;
