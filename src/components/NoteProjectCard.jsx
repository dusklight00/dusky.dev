import React from "react";
import { motion } from "framer-motion";

function NoteProjectCard({ title, description, tags }) {
  return (
    <motion.div
      className="bg-background-light-dark-color rounded w-80 px-6 py-7 shadow-md hover:shadow-xl z-50 transition-shadow"
      whileHover={{ y: "-5px" }}
    >
      <div className="flex items-center justify-between text-white-dark-color">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          viewBox="0 0 24 24"
          height="40px"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="feather feather-folder hover:text-white-color transition-colors"
        >
          <title>Folder</title>
          <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          viewBox="0 0 24 24"
          height="22px"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="feather feather-external-link hover:text-white-color transition-colors text-white-dark-color"
        >
          <title>External Link</title>
          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
          <polyline points="15 3 21 3 21 9"></polyline>
          <line x1="10" y1="14" x2="21" y2="3"></line>
        </svg>
      </div>
      <div className="font-sans font-bold text-xl text-white-dark-color pt-10 pb-1 hover:text-white-color transition-colors">
        {title}
      </div>
      <div className="font-sans text-white-dark-color text-md">
        {description}
      </div>
      <div className="font-mono flex gap-2 text-xs text-white-dark-color pt-5">
        {tags.map((tag) => (
          <div>{tag}</div>
        ))}
      </div>
    </motion.div>
  );
}

export default NoteProjectCard;
