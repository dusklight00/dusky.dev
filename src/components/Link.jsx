import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

function Link({ children }) {
  const [width, setWidth] = useState(0);
  const [opacity, setOpacity] = useState(1);
  const ref = useRef(null);

  const lineEffect = {
    hover: {
      width: "100%",
    },
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (ref.current) {
        setWidth(ref.current.offsetWidth);
        if (width <= 5) {
          setOpacity(0);
        } else if (opacity === 0) {
          setOpacity(1);
        }
      }
    });
    return () => clearInterval(interval);
  }, [width]);

  return (
    <motion.span
      className="font-sans text-white-color text-xl relative group whitespace-nowrap"
      whileHover="hover"
    >
      {children}
      <motion.span
        className="border inline-block w-0 absolute bottom-0 left-0 border-white-color"
        style={{ opacity: opacity }}
        ref={ref}
        variants={lineEffect}
      ></motion.span>
    </motion.span>
  );
}

export default Link;
