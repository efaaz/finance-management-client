import React from "react";
import HeroSection from "../components/Landing/HeroSection";
import { FeaturesSection } from "../components/Landing/FeatureSection";
import QuoteSection from "../components/Landing/QuoteSection";

function Home() {
  return (
    <>
      <HeroSection />
      <div className="h-auto overflow-hidden w-full bg-black bg-grid-small-white/[0.1] relative">
        <FeaturesSection />z
      </div>
      <div className="h-auto overflow-hidden w-full dark:bg-black bg-grid-small-white/[0.1] relative">
        <QuoteSection />
      </div>
    </>
  );
}

export default Home;
