import React from "react";
import AvatarImage from "../assets/profile-picture.jpg";
import { motion } from "framer-motion";
import { useColorModeValue } from "@chakra-ui/react";

function Avatar() {
  const borderColor = useColorModeValue("#4A5568", "#ACB2C9");

  const childVariants = {
    hover: { x: -10, y: -10 },
  };

  const parentVariants = {
    hover: { x: 5, y: 5 },
  };

  return (
    <div>
      <motion.div
        className="relative aspect-square w-full rounded-lg border-2"
        style={{ borderColor: borderColor }}
        whileHover="hover"
        variants={parentVariants}
      >
        <motion.div
          className="absolute bottom-3 right-3 z-10 h-full w-full rounded-lg backdrop-filter backdrop-grayscale opacity-70 transition-opacity duration-300 hover:opacity-0"
          variants={childVariants}
        />
        <motion.img
          src={AvatarImage}
          // src="https://media.licdn.com/dms/image/D5603AQHXOvO8lcPg1Q/profile-displayphoto-shrink_100_100/0/1704030237462?e=1713398400&v=beta&t=gfB_BCDf4d2n6qoLJqNWQIfQNiH1hoiexr7jdlGSAKg"
          alt="avatar"
          className="absolute bottom-3 right-3 h-full w-full rounded-lg object-cover filter"
          variants={childVariants}
        />
      </motion.div>
    </div>
  );
}

export default Avatar;
