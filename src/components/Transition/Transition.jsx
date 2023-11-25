import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { transitionVariantsPage } from "../../utils/motionTransitions.ts";

export default function Transition() {
  return (
    <>
      <AnimatePresence mode="wait">
        <div>
          <motion.div
            className="fixed top-0 bottom-0 right-full w-screen h-screen z-30 bg-[#28223c]"
            variants={transitionVariantsPage}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ delay: 0.4, duration: 0.6, ease: "easeInOut" }}
          ></motion.div>
          <motion.div
            className="fixed top-0 bottom-0 right-full w-screen h-screen z-20 bg-[#1f1934] opacity-50"
            variants={transitionVariantsPage}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ delay: 0.6, duration: 0.8, ease: "easeInOut" }}
          ></motion.div>
        </div>
      </AnimatePresence>
    </>
  );
}