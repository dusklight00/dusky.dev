import Loader from "./components/Loader";
import BgGridLines from "./components/BgGridLines";
import Navbar from "./components/Navbar";
import Socials from "./components/Socials";
import GlobalStyle from "./styles/GlobalStyle";
import Email from "./components/Email";
import Hero from "./components/Hero";
import AnimatedCursor from "react-animated-cursor";
import Avatar from "./components/Avatar";
import Link from "./components/Link";

import AvatarImage from "./assets/avatar.jpg";

import { motion } from "framer-motion";

function App() {
  return (
    <div className="App">
      {/* <AnimatedCursor /> */}
      <GlobalStyle />
      {/* <BgGridLines height="500px" /> */}
      {/* <Loader /> */}
      {/* <Navbar /> */}
      {/* <Socials /> */}
      {/* <Email /> */}
      {/* <Hero /> */}

      {/* <Avatar /> */}

      <div className="inline-block">
        <div className="flex items-center gap-10">
          <div className="font-mono text-grey-color text-xl">01.</div>
          <div className="font-sans text-white-color h-[50px] text-[40px] font-black">
            About Me
          </div>
          <div className="h-0 w-96 border border-white-color opacity-5"></div>
        </div>
        <div className="flex gap-10">
          <div className="font-sans text-white-dark-color text-xl w-[700px] text-justify">
            <p>
              Hello! My name is Brittany and I enjoy creating things that live
              on the internet. My interest in web development started back in
              2012 when I decided to try editing custom Tumblr themes — turns
              out hacking together a custom reblog button taught me a lot about
              HTML & CSS!
            </p>
            <p>
              Fast-forward to today, and I’ve had the privilege of working at an
              advertising agency, <Link>a start-up</Link>,{" "}
              <Link>a huge corporation</Link>, and{" "}
              <Link>a student-led design studio</Link>. My main focus these days
              is building accessible, inclusive products and digital experiences
              at Upstatement for a variety of clients.
            </p>
            <p>
              I also recently launched a course that covers everything you need
              to build a web app with the Spotify API using Node & React.
            </p>
            Here are a few technologies I’ve been working with recently:
          </div>
          <Avatar />
        </div>
      </div>
      <br />

      {/* <motion.span
        className="font-bold font-sans text-white-color text-xl relative cursor-pointer"
        whileHover="hover"
      >
        External Link
        <motion.div
          className="border inline-block w-0 absolute bottom-0 left-0 border-white-color"
          variants={lineEffect}
        ></motion.div>
      </motion.span> */}

      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
    </div>
  );
}

export default App;
