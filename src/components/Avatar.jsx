import React from "react";
import AvatarImage from "../assets/profile-picture-v2-cropped.jpg";
import { motion } from "framer-motion";

function Avatar() {
  const childVariants = {
    hover: { x: -10, y: -10 },
  };

  const parentVariants = {
    hover: { x: 5, y: 5 },
  };

  return (
    <div>
      <motion.div
        className="relative w-[300px] h-[300px] rounded-lg border-2 border-white-dark-color"
        whileHover="hover"
        variants={parentVariants}
      >
        <motion.div
          className="absolute w-full h-full rounded-lg bottom-3 right-3 z-10 backdrop-filter backdrop-grayscale opacity-70 hover:opacity-0 transition-opacity duration-300"
          variants={childVariants}
        />
        <motion.img
          src={AvatarImage}
          alt="avatar"
          className="absolute h-full rounded-lg bottom-3 right-3 filter"
          variants={childVariants}
        />
      </motion.div>
    </div>
  );
}

export default Avatar;
