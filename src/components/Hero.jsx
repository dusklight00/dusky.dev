import React from "react";
import { motion } from "framer-motion";
import Typewriter from "typewriter-effect";

function Hero() {
  const hi = {
    hidden: { opacity: 0, y: 50 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 3,
      },
    },
  };

  const rahul = {
    hidden: { opacity: 0, y: 50 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 3.25,
      },
    },
  };

  const developer = {
    hidden: { opacity: 0, y: 50 },
    show: {
      opacity: 0.6,
      y: 0,
      transition: {
        delay: 3.5,
      },
    },
  };

  const para = {
    hidden: { opacity: 0, y: 50 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 3.75,
      },
    },
  };

  return (
    <motion.div
      // variants={parent}
      className="flex pl-[300px] items-center mt-20"
      initial="hidden"
      animate="show"
    >
      <div className="h-screen">
        <motion.h1 variants={hi} className="font-mono text-grey-color text-3xl">
          Hello, I'm
        </motion.h1>
        <motion.h2
          variants={rahul}
          className="font-sans text-white-color text-[120px] font-black p-0 m-0 ml-[-6px]"
        >
          Rahul Raj
        </motion.h2>
        <motion.h3
          variants={developer}
          className="font-sans text-white-color text-[120px] font-black opacity-60 p-0 mt-[-50px] ml-[-6px]"
        >
          <Typewriter
            options={{
              strings: [
                "Coder",
                "Problem Solver",
                "Thinker",
                // "yet another otaku.",
                // "manga reader.",
                // "introvert.",
                // "nerd.",
                // "overthinker.",
                // "believes in time-travel.",
                // "divide & conquer.",
                // "array is not a pointer.",
                // "loves javascript.",
                // "hates javascript.",
                // "everything is object.",
                // "++i is better.",
                // "it's one-electron world.",
                // "ghost exists.",
                // "BinarySort();",
              ],
              autoStart: true,
              loop: true,
            }}
          />
        </motion.h3>
        <motion.p
          variants={para}
          className="font-sans text-white-dark-color text-2xl mt-[-20px]"
        >
          I’m a fresher specializing in building (and occasionally
          <br />
          designing) exceptional digital experiences. Currently, I’m focused on
          <br />
          learning, growing my skills, and build new ideas!
        </motion.p>
      </div>
    </motion.div>
  );
}

export default Hero;
