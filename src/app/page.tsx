import FaqSection from "@/components/sections/FaqSection";
import Hero from "@/components/sections/HeroSection";
import React from "react";
import FeaturePage from "./features/page";

import HowItWorksSection from "@/components/sections/HowItWorks";

const Home = () => {
  return (
    <>
      <Hero />
      <HowItWorksSection />
      <FeaturePage />
      <div className="px-4 md:px-[6rem] flex flex-col gap-[5rem] md:gap-[12.5rem] py-[2rem] md:py-[5rem]">
        <FaqSection />
      </div>
    </>
  );
};

export default Home;
