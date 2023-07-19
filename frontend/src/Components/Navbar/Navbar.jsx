import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../Contexts/UserContext";

function Navbar() {
  const [toggleMenu, setToggleMenu] = useState(false);
  const [width, setWidth] = useState(window.innerWidth);
  const { user } = useContext(UserContext) || {};

  const toggleNavMobileScreen = () => {
    setToggleMenu(!toggleMenu);
  };

  useEffect(() => {
    const changeWidth = () => {
      setWidth(window.innerWidth);
      if (window.innerWidth > 500) {
        setToggleMenu(false);
      }
    };

    window.addEventListener("resize", changeWidth);

    return () => {
      window.removeEventListener("resize", changeWidth);
    };
  }, []);

  return (
    <nav>
      {(toggleMenu || width > 500) && (
        <ul className="liste">
          <li className="items">
            <Link to="/">Home</Link>
          </li>
          <li className="items">
            <Link to="/Services">Services</Link>
          </li>
          <li className="items">
            <Link to="/Contact">Contact</Link>
          </li>
          <li className="items">
            <Link to="/FlightFormPage">Flight Form Page</Link>
          </li>
          <li className="items">
            <span>{user}</span>
          </li>
        </ul>
      )}
      <button
        type="button"
        className="navbarBtn"
        onClick={toggleNavMobileScreen}
      >
        BTN
      </button>
    </nav>
  );
}

export default Navbar;
