import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";

function Navbar() {
  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  return (
    <>
      <nav className="bg-primary h-20 flex justify-between items-center px-4">
        <Link
          to="/"
          className="text-light cursor-pointer no-underline text-4xl font-bold font-astro"
          onClick={closeMobileMenu}
        >
          Rocket Tracker
        </Link>
        {/* Burger menu icon, visible only on small screens */}
        <div
          className="text-white text-2xl cursor-pointer md:hidden"
          onClick={handleClick}
        >
          <FontAwesomeIcon icon={click ? faTimes : faBars} />
        </div>
        {/* Nav menu - visible only on medium and larger screens */}
        <ul className="hidden md:flex space-x-4 items-center ml-auto">
          <li className="flex items-center">
            <Link
              to="/"
              className="text-white no-underline py-2.5 px-4 hover:bg-light rounded transition-all duration-200 ease-out font-zendots"
            >
              Home
            </Link>
          </li>
          <li className="flex items-center">
            <Link
              to="/graphs"
              className="text-white no-underline py-2.5 px-4 hover:bg-light rounded transition-all duration-200 ease-out font-zendots"
            >
              Flight Charts
            </Link>
          </li>
        </ul>
        {/* Mobile menu - visible only on small screens when burger menu is clicked */}
        <ul
          className={`${
            click ? "flex" : "hidden"
          } flex-col absolute top-20 left-0 w-full bg-dark text-center md:hidden`}
        >
          <li className="border-b border-gray-700">
            <Link
              to="/"
              className="text-white no-underline py-4 hover:bg-light block"
              onClick={closeMobileMenu}
            >
              Home
            </Link>
          </li>
          <li className="border-b border-gray-700">
            <Link
              to="/sign-up"
              className="text-white no-underline py-4 hover:bg-light block"
              onClick={closeMobileMenu}
            >
              Sign Up
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default Navbar;
