import React from "react";
import { motion } from "framer-motion";

function Email() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, ease: "easeInOut", delay: 4 }}
      className="fixed flex flex-col gap-4 items-center justify-center bottom-0 right-[-50px]"
    >
      <div
        className="relative rotate-90 text-sm text-white-dark-color bottom-[125px] hover:bottom-[130px] transition-all hover:text-white-color cursor-pointer duration-200"
        style={{
          fontFamily:
            "'SF Mono', 'Fira Code', 'Fira Mono', 'Roboto Mono', monospace",
        }}
      >
        r.rahul.developer@gmail.com
      </div>
      <div className="border border-1 border-white-dark-color w-px h-20"></div>
    </motion.div>
  );
}

export default Email;
