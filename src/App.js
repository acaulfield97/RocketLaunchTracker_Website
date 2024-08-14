import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Stats from "./pages/stats";
import Graphs from "./pages/Graphs";
import Navbar from "./components/Navbar";
import { FlightDataProvider } from "./contexts/FlightDataContext";

function App() {
  return (
    <Router>
      <FlightDataProvider>
        <div>
          <Navbar />
          <Routes>
            <Route path="/rawdata" element={<Stats />} />
            <Route path="/graphs" element={<Graphs />} />
          </Routes>
        </div>
      </FlightDataProvider>
    </Router>
  );
}

export default App;
