import React from "react";
import GridLines from "react-gridlines";
import { motion } from "framer-motion";
import { useColorModeValue } from "@chakra-ui/react";

function BgGridLines({ height }) {
  const backgroundColor = useColorModeValue("#FFFFFF", "#0E1016");
  const lineColor = useColorModeValue(
    "rgba(26, 32, 44, 0.12)",
    "rgba(236, 238, 243, 0.08)"
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, ease: "easeInOut", delay: 2 }}
      className="absolute inset-0 z-[-1]"
    >
      <div className="relative" style={{ opacity: 0.9 }}>
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(to bottom, transparent, ${backgroundColor})`,
          }}
        ></div>
        <GridLines
          className="grid-area"
          cellWidth={80}
          lineColor={lineColor}
          strokeWidth={2}
          cellWidth2={40}
          lineColor2={lineColor}
          height={100}
        >
          <div style={{ height: height }}></div>
        </GridLines>
      </div>
    </motion.div>
  );
}

export default BgGridLines;
