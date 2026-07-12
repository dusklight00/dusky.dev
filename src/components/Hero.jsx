import React from "react";
import { motion } from "framer-motion";
import Typewriter from "typewriter-effect";
import { useColorModeValue } from "@chakra-ui/react";


function Hero() {
  const greyColor = useColorModeValue("#718096", "#6e7ba0");
  const whiteColor = useColorModeValue("#1A202C", "#ECEEF3");
  const whiteDarkColor = useColorModeValue("#4A5568", "#ACB2C9");

  const hi = {
    hidden: { opacity: 0, y: 50 },
    show: {
      opacity: 1,
      y: 0,
      transition: { delay: 3 },
    },
  };

  const rahul = {
    hidden: { opacity: 0, y: 50 },
    show: {
      opacity: 1,
      y: 0,
      transition: { delay: 3.25 },
    },
  };

  const developer = {
    hidden: { opacity: 0, y: 50 },
    show: {
      opacity: 0.6,
      y: 0,
      transition: { delay: 3.5 },
    },
  };

  const para = {
    hidden: { opacity: 0, y: 50 },
    show: {
      opacity: 1,
      y: 0,
      transition: { delay: 3.75 },
    },
  };

  return (
    <motion.div
      // variants={parent}
      className="flex pl-[300px] max-lg:pl-0 items-center mt-20 max-lg:mt-10 max-sm:mt-5 max-lg:flex-col max-lg:gap-5"
      initial="hidden"
      animate="show"
    >
      <div className="h-screen w-full max-lg:text-center">
        <motion.h1
          variants={hi}
          className="font-mono text-3xl max-lg:text-2xl max-sm:text-xl"
          style={{ color: greyColor }}
        >
          Hello, I'm
        </motion.h1>
        <motion.h2
          variants={rahul}
          className="font-sans text-[120px] font-black p-0 m-0 ml-[-6px] max-lg:text-[80px] max-sm:text-[50px]"
          style={{ color: whiteColor }}
        >
          Rahul Raj
        </motion.h2>
        <motion.h3
          variants={developer}
          className="font-sans text-[120px] font-black opacity-60 p-0 mt-[-50px] ml-[-6px] max-lg:text-[80px] max-sm:text-[50px] max-sm:mt-[-30px]"
          style={{ color: whiteColor }}
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
          className="font-sans text-2xl mt-[-20px] max-lg:text-xl max-sm:text-sm"
          style={{ color: whiteDarkColor }}
        >
          I'm a fresher specializing in building (and occasionally
          <br />
          designing) exceptional digital experiences. Currently, I'm focused on
          <br />
          learning, growing my skills, and build new ideas!
        </motion.p>


      </div>
    </motion.div>
  );
}

export default Hero;
