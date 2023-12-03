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
import ArticleLink from "./components/ArticleLink";

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
      <NoteProjectSection />
      <ArticleLink />
    </div>
  );
}

export default App;
