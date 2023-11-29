import React from "react";
import { motion } from "framer-motion";

function Loader() {
  const color = "#ACB2C9";

  const border = {
    hidden: {
      pathLength: 0,
    },
    visible: {
      pathLength: 1,
      transition: {
        duration: 0.5,
        ease: "easeInOut",
      },
    },
  };

  const letter = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        delay: 1,
        duration: 0.5,
        ease: "easeInOut",
      },
    },
  };

  return (
    <div className="absolute w-screen flex items-center justify-center h-screen">
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        width="150"
        height="150"
        viewBox="0 0 100 100"
        fill="none"
        initial={{ scale: 1 }}
        animate={{ scale: 0 }}
        transition={{ duration: 0.3, delay: 2, ease: "easeIn" }}
      >
        <motion.path
          d="M40.0128 66V35.4545H51.4673C53.8139 35.4545 55.7827 35.8622 57.3736 36.6776C58.9744 37.4929 60.1825 38.6364 60.9979 40.108C61.8232 41.5696 62.2358 43.2749 62.2358 45.2237C62.2358 47.1825 61.8182 48.8828 60.983 50.3246C60.1577 51.7564 58.9396 52.8651 57.3288 53.6506C55.718 54.4261 53.7393 54.8139 51.3928 54.8139H43.2344V50.2202H50.647C52.0192 50.2202 53.1428 50.0312 54.0178 49.6534C54.8928 49.2656 55.5391 48.7038 55.9567 47.968C56.3842 47.2223 56.598 46.3075 56.598 45.2237C56.598 44.1399 56.3842 43.2152 55.9567 42.4496C55.5291 41.674 54.8778 41.0874 54.0028 40.6896C53.1278 40.282 51.9993 40.0781 50.6172 40.0781H45.5462V66H40.0128ZM55.7926 52.1591L63.3544 66H57.1797L49.7521 52.1591H55.7926Z"
          fill={color}
          initial="hidden"
          animate="visible"
          variants={letter}
        />
        <motion.path
          d="M50 5L11 27V72L50 95L89 73V28L50 5Z"
          stroke={color}
          strokeWidth="5"
          initial="hidden"
          animate="visible"
          variants={border}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </motion.svg>
    </div>
  );
}

export default Loader;
