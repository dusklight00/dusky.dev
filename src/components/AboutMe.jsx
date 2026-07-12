import React from "react";
import Link from "./Link";
import Avatar from "./Avatar";
import { motion } from "framer-motion";
import { useColorModeValue } from "@chakra-ui/react";

function AboutMe() {
  const headingColor = useColorModeValue("#1A202C", "#ECEEF3");
  const textColor = useColorModeValue("#4A5568", "#ACB2C9");
  const dividerColor = useColorModeValue("#E2E8F0", "#ECEEF3");

  return (
    <motion.div
      className="flex min-h-screen flex-col items-center gap-10 px-6 py-20 sm:px-10 lg:flex-row lg:gap-24 lg:px-24 xl:px-64"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, ease: "easeInOut", delay: 4 }}
    >
      <div className="flex w-full max-w-4xl flex-1 flex-col lg:max-w-none">
        <div className="mt-0 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6 lg:mt-10">
          <div className="font-mono text-grey-color text-xl">01.</div>
          <div
            className="font-sans text-4xl font-black sm:text-5xl lg:text-6xl"
            style={{ color: headingColor }}
          >
            About Me
          </div>
          <div
            className="hidden h-0 flex-1 border opacity-5 sm:block"
            style={{ borderColor: dividerColor }}
          ></div>
        </div>
        <div className="flex w-full gap-10">
          <div
            className="font-sans text-lg leading-relaxed sm:text-xl lg:text-2xl"
            style={{ color: textColor }}
          >
            <p className="mt-6 sm:mt-10">
              Hello! My name is Rahul and I enjoy creating things that live on
              the internet. My interest in web development started back in 2012
              when I decided to try editing custom <Link>Tumblr</Link> themes —
              turns out hacking together a custom reblog button taught me a lot
              about HTML & CSS!
            </p>
            {/* <p className="mt-10 text-2xl">
              Fast-forward to today, and I've had the privilege of working at an
              advertising agency, <Link>a start-up</Link>,{" "}
              <Link>a huge corporation</Link>, and{" "}
              <Link>a student-led design studio</Link>. My main focus these days
              is building accessible, inclusive products and digital experiences
              at Upstatement for a variety of clients.
            </p> */}
            <p className="mt-6 sm:mt-10">
              I also recently launched a course that covers everything you need
              to build a web app with the Spotify API using Node & React
            </p>
            {/* <p className="mt-10">
          Here are a few technologies I've been working with recently:
        </p> */}
          </div>
        </div>
      </div>
      <div className="mx-auto w-full max-w-[240px] sm:max-w-[280px] lg:mx-0 lg:max-w-[320px] xl:max-w-[360px] lg:shrink-0">
        <Avatar />
      </div>
    </motion.div>
  );
}

export default AboutMe;
