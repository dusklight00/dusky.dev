import Loader from "./components/Loader";
import BgGridLines from "./components/BgGridLines";
import Navbar from "./components/Navbar";
import Socials from "./components/Socials";
import GlobalStyle from "./styles/GlobalStyle";
import Email from "./components/Email";
import Hero from "./components/Hero";
import AnimatedCursor from "react-animated-cursor";
import AboutMe from "./components/AboutMe";
import ProjectSection from "./components/ProjectSection";
import NoteProjectCard from "./components/NoteProjectCard";
import Link from "./components/Link";
import { Button } from "@chakra-ui/react";

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
      <ProjectSection />
      <div className="mt-32">
        <div className="flex items-center flex-col gap-5 mb-10">
          <div className="font-sans text-white-color h-[50px] text-[40px] font-black mx-auto">
            Other Noteworthy Projects
          </div>
          <Link>view the archieve</Link>
        </div>
        <div className="grid grid-cols-3 gap-7 w-4/6 mx-auto">
          <NoteProjectCard />
          <NoteProjectCard />
          <NoteProjectCard />
          <NoteProjectCard />
          <NoteProjectCard />
          <NoteProjectCard />
        </div>
        <div className="flex justify-center p-10">
          <Button variant="ghost" colorScheme="white" size="md">
            Show More
          </Button>
        </div>
      </div>
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
