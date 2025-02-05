import React from "react";
import { motion } from "framer-motion";
import { LampContainer } from "../ui/lamp";

function QuoteSection() {
  return (
    <LampContainer>
      <motion.h1
        initial={{ opacity: 0.5, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="mt-8 bg-gradient-to-br from-slate-300 to-slate-500 py-4 bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-5xl"
      >
        Do not save what is left after spending, <br /> but spend what is left
        after saving.
        <p className="text-xl mt-9 text-slate-500 text-right">-- Warrent Buffet </p>
      </motion.h1>
    </LampContainer>
  );
}

export default QuoteSection;
