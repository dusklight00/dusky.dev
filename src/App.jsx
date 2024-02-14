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
import NoteProjectSection from "./components/NoteProjectSection";
import BlogSection from "./components/BlogSection";
import Footer from "./components/Footer";
import ContactMe from "./components/ContactMe";
import HackathonSection from "./components/HackathonSection";
import CertificateSection from "./components/CertificateSection";

import { LinkedInEmbed } from "react-social-media-embed";

function App() {
  return (
    <div className="App">
      <AnimatedCursor />
      <GlobalStyle />
      <BgGridLines height="500px" />
      <Loader />
      <Navbar />
      <Socials />
      {/* <Email /> */}
      <Hero />
      <AboutMe />
      <HackathonSection />
      <CertificateSection />
      <ProjectSection />
      <NoteProjectSection />
      <BlogSection />
      <ContactMe />
      <Footer />
    </div>
  );
}

export default App;
