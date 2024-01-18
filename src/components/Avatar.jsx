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
        className="relative w-[300px] h-[300px] rounded-lg border-2 border-white-dark-color filter grayscale"
        whileHover="hover"
        variants={parentVariants}
      >
        <motion.img
          src={AvatarImage}
          alt="avatar"
          className="absolute h-full rounded-lg bottom-3 right-3"
          variants={childVariants}
        />
      </motion.div>
    </div>
  );
}

export default Avatar;
