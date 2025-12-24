import React from "react";
import { useColorModeValue } from "@chakra-ui/react";

function Footer() {
  const textColor = useColorModeValue("#4A5568", "#ACB2C9");
  const hoverColor = useColorModeValue("#1A202C", "#ECEEF3");

  return (
    <div
      className="flex flex-col gap-2 p-7 transition-colors duration-100"
      style={{ color: textColor }}
      onMouseEnter={(e) => e.currentTarget.style.color = hoverColor}
      onMouseLeave={(e) => e.currentTarget.style.color = textColor}
    >
      <div className="text-center font-mono text-sm">
        Designed & Built by Rahul Raj
      </div>
      <div className="flex justify-center gap-4">
        <div className="flex gap-2 items-center">
          <div>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              width="15px"
              className="feather feather-star"
            >
              <title>Star</title>
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
            </svg>
          </div>
          <div className="text-sm font-mono">0</div>
        </div>
        <div className="flex gap-2 items-center">
          <div>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-git-branch"
              width="15px"
            >
              <title>Git Fork</title>
              <line x1="6" y1="3" x2="6" y2="15"></line>
              <circle cx="18" cy="6" r="3"></circle>
              <circle cx="6" cy="18" r="3"></circle>
              <path d="M18 9a9 9 0 0 1-9 9"></path>
            </svg>
          </div>
          <div className="text-sm font-mono">0</div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
