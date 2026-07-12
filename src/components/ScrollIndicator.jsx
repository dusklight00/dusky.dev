import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useColorModeValue } from "@chakra-ui/react";

function ScrollIndicator({ targetId = "about-me-section", delay = 4.25 }) {
  const greyColor = useColorModeValue("#718096", "#6e7ba0");
  const [visible, setVisible] = useState(true);
  const hasAppearedOnce = useRef(false);   // track first mount vs re-appearance

  // Hide when scrolled past 80px; show again when scrolled back
  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY < 80);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = () => {
    const target = document.getElementById(targetId);
    if (target) target.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          key="scroll-indicator"
          // Let framer-motion own the x transform to avoid conflicts with exit animation
          style={{
            position: "fixed",
            bottom: "7rem",
            left: "50%",
            background: "none",
            border: "none",
            padding: 0,
            zIndex: 50,
            cursor: "pointer",
          }}
          initial={{ opacity: 0, x: "-50%" }}
          animate={{
            opacity: 1,
            x: "-50%",
            transition: {
              // Long delay only on the very first appearance; instant on scroll-back
              delay: hasAppearedOnce.current ? 0 : delay,
              duration: 0.6,
            },
          }}
          exit={{
            opacity: 0,
            x: "-50%",           // keep x fixed — no horizontal drift
            transition: { duration: 0.2, delay: 0 },
          }}
          onAnimationComplete={() => {
            hasAppearedOnce.current = true;
          }}
          onClick={handleClick}
          aria-label="Scroll down"
          className="flex flex-col items-center gap-2 group"
        >
          {/* Mouse outline */}
          <div
            className="relative w-[26px] h-[42px] rounded-[13px] border-2 flex justify-center pt-[6px] transition-opacity duration-300 group-hover:opacity-60"
            style={{ borderColor: greyColor }}
          >
            {/* Scrolling dot */}
            <motion.div
              className="w-[4px] h-[8px] rounded-full"
              style={{ backgroundColor: greyColor }}
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>

          {/* Label */}
          <span
            className="font-mono text-xs tracking-widest uppercase"
            style={{ color: greyColor }}
          >
            Scroll
          </span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}

export default ScrollIndicator;
