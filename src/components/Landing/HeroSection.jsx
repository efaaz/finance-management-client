import React from "react";
import { TextGenerateEffect } from "../ui/text-generate-effect";
import { Spotlight } from "../ui/spotlight-new";
const words = `Say goodbye to financial chaos! Our AI-powered finance tracker lets you monitor spending, boost savings, and stay in control – all in a sleek, modern dashboard. Smart insights, effortless tracking, and total financial freedom!`;

function HeroSection() {
  return (
    <>
      <div className="h-[50rem] overflow-hidden w-full dark:bg-black bg-white  dark:bg-grid-white/[0.1] bg-grid-black/[0.1] relative flex items-center justify-center">
        <Spotlight />
        <div className="max-w-5xl mx-auto p-4">
          <h1 className="text-xl text-center sm:text-5xl font-bold relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-100 to-neutral-300 py-4">
            The road to freedom starts from here
          </h1>
          <div className="text-neutral-700 text-center  mt-2">
            <TextGenerateEffect className={"text-xs md:text-sm"} duration={2} filter={false} words={words} />
          </div>
          <div className="justify-center flex mt-5">
            <button className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
              <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
              <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-6 py-2 text-sm font-medium text-white backdrop-blur-3xl">
                Sign up for free
              </span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default HeroSection;
