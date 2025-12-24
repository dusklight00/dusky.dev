import React from "react";
import { motion } from "framer-motion";
import { Button, IconButton, useColorMode, useColorModeValue } from "@chakra-ui/react";
import { DownloadIcon, SunIcon, MoonIcon } from "@chakra-ui/icons";

function Navbar() {
  const { colorMode, toggleColorMode } = useColorMode();
  const buttonBg = useColorModeValue("gray.100", "navy.800");
  const buttonHoverBg = useColorModeValue("gray.200", "navy.700");
  const iconColor = useColorModeValue("gray.800", "#ECEEF3");

  const onButtonClick = () => {
    const pdfUrl = "Rahul___Resume.pdf";
    const link = document.createElement("a");
    link.href = pdfUrl;
    link.download = "document.pdf"; // specify the filename
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <motion.nav
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, ease: "easeInOut", delay: 4 }}
      className="px-4 py-4 top-0 w-full flex justify-end gap-3"
      id="navbar"
    >
      <Button
        leftIcon={<DownloadIcon />}
        variant="ghost"
        size="lg"
        style={{ fontSize: "20px" }}
        onClick={onButtonClick}
        _hover={{ bg: buttonHoverBg }}
      >
        Resume
      </Button>
      <IconButton
        icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
        onClick={toggleColorMode}
        variant="outline"
        aria-label="Toggle color mode"
        size="lg"
        borderColor={useColorModeValue("gray.300", "whiteAlpha.300")}
        _hover={{ bg: buttonHoverBg }}
      />
    </motion.nav>
  );
}

export default Navbar;
