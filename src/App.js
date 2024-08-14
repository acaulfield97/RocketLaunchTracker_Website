import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RawData from "./pages/RawData";
import Graphs from "./pages/Graphs";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import { FlightDataProvider } from "./contexts/FlightDataContext";

function App() {
  return (
    <Router>
      <FlightDataProvider>
        <div>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/rawdata" element={<RawData />} />
            <Route path="/graphs" element={<Graphs />} />
          </Routes>
          <Footer />
        </div>
      </FlightDataProvider>
    </Router>
  );
}

export default App;
