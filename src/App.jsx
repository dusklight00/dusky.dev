import Loader from "./components/Loader";
import BgGridLines from "./components/BgGridLines";
import Navbar from "./components/Navbar";
import Socials from "./components/Socials";

function App() {
  return (
    <div className="App">
      <BgGridLines height="500px" />
      <Loader />
      <Navbar />
      <Socials />
    </div>
  );
}

export default App;
