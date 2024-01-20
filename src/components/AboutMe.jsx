import React from "react";
import Link from "./Link";
import Avatar from "./Avatar";
import { motion } from "framer-motion";

function AboutMe() {
  return (
    <motion.div
      className="flex items-center gap-20 mx-64 h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, ease: "easeInOut", delay: 4 }}
    >
      <div className="flex-1 flex flex-col">
        <div className="flex items-center gap-10 mt-10">
          {/* <div className="font-mono text-grey-color text-xl">01.</div> */}
          <div className="font-sans text-white-color h-[50px] text-[40px] font-black flex-2">
            About Me
          </div>
          <div className="h-0 flex-1 border border-white-color opacity-5"></div>
        </div>
        <div className="flex gap-10 w-full">
          <div className="font-sans text-white-dark-color text-xl">
            <p className="mt-10">
              Hello! My name is Rahul and I enjoy creating things that live on
              the internet. My interest in web development started back in 2012
              when I decided to try editing custom Tumblr themes — turns out
              hacking together a custom reblog button taught me a lot about HTML
              & CSS!
            </p>
            <p className="mt-10">
              Fast-forward to today, and I’ve had the privilege of working at an
              advertising agency, <Link>a start-up</Link>,{" "}
              <Link>a huge corporation</Link>, and{" "}
              <Link>a student-led design studio</Link>. My main focus these days
              is building accessible, inclusive products and digital experiences
              at Upstatement for a variety of clients.
            </p>
            <p className="mt-10">
              I also recently launched a course that covers everything you need
              to build a web app with the Spotify API using Node & React.
            </p>
            {/* <p className="mt-10">
          Here are a few technologies I’ve been working with recently:
        </p> */}
          </div>
        </div>
      </div>
      <div>
        <Avatar />
      </div>
    </motion.div>
  );
}

export default AboutMe;
