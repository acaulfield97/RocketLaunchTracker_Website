import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-primary text-light py-6 px-4">
      <div className="container mx-auto flex flex-col  items-center">
        <div className="text-center ">
          <p className="text-xl font-bold font-astro">Rocket Tracker</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
