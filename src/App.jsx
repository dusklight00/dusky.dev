import Loader from "./components/Loader";
import BgGridLines from "./components/BgGridLines";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="App">
      <BgGridLines height="500px" />
      <Loader />
      <Navbar />
    </div>
  );
}

export default App;
