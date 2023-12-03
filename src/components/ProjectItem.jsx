import React from "react";
import Image from "./../assets/live-digit-recognizer.gif";

function ProjectItem({ alignment = "left" }) {
  return (
    <div className="flex justify-center mb-20">
      <div
        className={
          alignment == "left"
            ? "mx-24 flex items-center"
            : "mx-24 flex items-center flex-row-reverse"
        }
      >
        <div
          className={
            alignment == "left" ? "z-10" : "z-10 flex flex-col items-end"
          }
        >
          <div className="font-mono text-grey-color text-sm z-30">
            Featured Project
          </div>
          <div className="font-sans text-white-color h-[50px] text-[30px] font-black flex-2 pt-1">
            Live Digit Recognizer
          </div>
          <div
            className={
              alignment == "left"
                ? "p-5 bg-background-light-dark-color w-[500px] rounded shadow-md hover:shadow-xl transition-shadow duration-500"
                : "p-5 bg-background-light-dark-color w-[500px] rounded shadow-md hover:shadow-xl transition-shadow duration-500 text-right"
            }
          >
            A project, that use MNIST dataset along with keras merged with web
            technologies to make a interface that recognize and classifies
            handritten digits live.
          </div>
          <div className="flex font-mono gap-5 py-5 px-1 text-sm text-white-dark-color">
            <span>VS Code</span>
            <span>Sublime Text</span>
            <span>Atom</span>
            <span>iTerm2</span>
            <span>Hyper</span>
          </div>
          <div className="flex justify-between w-16 px-1 text-white-dark-color ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              role="img"
              viewBox="0 0 24 24"
              fill="none"
              height="20px"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-github hover:text-white-color transition-colors"
            >
              <title>GitHub</title>
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              role="img"
              viewBox="0 0 24 24"
              height="20px"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-external-link hover:text-white-color transition-colors"
            >
              <title>External Link</title>
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
              <polyline points="15 3 21 3 21 9"></polyline>
              <line x1="10" y1="14" x2="21" y2="3"></line>
            </svg>
          </div>
        </div>
        <div
          className={
            alignment == "left"
              ? "z-0 ml-[-50px] w-[570px] rounded relative shadow-lg"
              : "z-0 mr-[-50px] w-[570px] rounded relative shadow-lg"
          }
        >
          {/* <div className="bg-green absolute inset-0 opacity-30 z-20 rounded-lg"></div> */}
          <img
            src={Image}
            alt="live-digit-recognizer"
            width="100%"
            className="rounded-md hover:grayscale-0 transition-all"
          />
        </div>
      </div>
    </div>
  );
}

export default ProjectItem;
