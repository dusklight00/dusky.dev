import React from "react";
import { motion } from "framer-motion";
import { Button } from "@chakra-ui/react";
import { DownloadIcon } from "@chakra-ui/icons";
import { useColorMode } from "@chakra-ui/react";

function Navbar() {
  const { colorMode, toggleColorMode } = useColorMode();

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
        colorScheme="white"
        size="lg"
        style={{ fontSize: "20px" }}
        onClick={onButtonClick}
      >
        Resume
      </Button>
      <button
        onClick={toggleColorMode}
        className="p-2 rounded-lg bg-body-800 hover:bg-body-700 outline outline-1 outline-navy-color outline-body-700 transition-all bg-navy-dark-color z-10 hover:bg-navy-color"
      >
        <svg
          stroke="currentColor"
          fill="#ECEEF3"
          strokeWidth="0"
          viewBox="0 0 20 20"
          height="30px"
          width="30px"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
            clipRule="evenodd"
          ></path>
        </svg>
      </button>
    </motion.nav>
  );
}

export default Navbar;
