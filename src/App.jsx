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
import AboutMe from "./components/AboutMe";

import AvatarImage from "./assets/avatar.jpg";

import { motion } from "framer-motion";

function App() {
  return (
    <div className="App">
      <AnimatedCursor />
      <GlobalStyle />
      <BgGridLines height="500px" />
      <Loader />
      <Navbar />
      <Socials />
      <Email />
      <Hero />
      <AboutMe />
    </div>
  );
}

export default App;
