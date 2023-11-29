import Loader from "./components/Loader";
import BgGridLines from "./components/BgGridLines";
import Navbar from "./components/Navbar";
import Socials from "./components/Socials";
import GlobalStyle from "./styles/GlobalStyle";
import Email from "./components/Email";

function App() {
  return (
    <div className="App">
      <GlobalStyle />
      <BgGridLines height="500px" />
      <Loader />
      <Navbar />
      <Socials />
      <Email />
    </div>
  );
}

export default App;
