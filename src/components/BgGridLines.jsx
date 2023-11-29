import React from "react";
import GridLines from "react-gridlines";
import { motion } from "framer-motion";

function BgGridLines({ height }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, ease: "easeInOut", delay: 2 }}
      className="absolute inset-0"
    >
      <div className="relative opacity-5">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background-color"></div>
        <GridLines
          className="grid-area"
          cellWidth={80}
          strokeWidth={2}
          cellWidth2={40}
          height={100}
        >
          <div style={{ height: height }}>asd</div>
        </GridLines>
      </div>
    </motion.div>
  );
}

export default BgGridLines;
