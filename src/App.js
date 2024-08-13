import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./pages/home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Stats from "./pages/stats";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Stats />
        {/* <Routes> */}
        {/* <Route path="/" exact /> */}
        {/* <Route path="/stats" /> */}
        {/* </Routes> */}
      </Router>
    </>
  );
}

export default App;
