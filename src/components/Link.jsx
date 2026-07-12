import React from "react";
import { motion } from "framer-motion";
import { useColorModeValue } from "@chakra-ui/react";

function Link({ children }) {
  const textColor = useColorModeValue("#1A202C", "#ECEEF3");
  const lineColor = useColorModeValue("#1A202C", "#ECEEF3");

  const lineEffect = {
    hover: {
      width: "100%",
      opacity: 1,
    },
  };

  return (
    <motion.span
      className="relative inline-block whitespace-nowrap font-sans text-[inherit] leading-[inherit]"
      style={{ color: textColor }}
      whileHover="hover"
    >
      {children}
      <motion.span
        className="absolute bottom-[0.1em] left-0 h-px w-0 opacity-70"
        style={{ backgroundColor: lineColor }}
        variants={lineEffect}
      />
    </motion.span>
  );
}

export default Link;
