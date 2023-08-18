import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import earth from "../../assets/earth.png";
import UserContext from "../../contexts/UserContext";

function Navbar() {
  const { userId, setUserId, setFirstname, setIsLoggedIn } =
    useContext(UserContext);
  const isLoggedIn = userId !== null;

  const navigate = useNavigate();
  const handleLogout = (evt) => {
    evt.preventDefault();
    setIsLoggedIn(false);
    setUserId(null);
    setFirstname(null);
    navigate("/");
  };

  return (
    <div className="fixed bottom-0 left-0 h-[5vh] w-full bg-gradient-to-r from-[#8AA626] to-[#274001] text-[#EEF279] border-t rounded-sm border-[#EEF279] border-opacity-30 backdrop-filter backdrop-blur-sm md:top-0 md:min-w-[65vw] md:max-h-[40vh] md:border-none">
      <ul className="flex justify-around items-center h-full md:text-xl">
        <li>
          <NavLink to="/">
            <img src={earth} alt="earth" className="h-8 md:h-10" />
          </NavLink>
        </li>

        <li>
          <NavLink to="/FlightFormPage">Calculer</NavLink>
        </li>
        <li>
          <NavLink to="/userprofil">Profil</NavLink>
        </li>
        <li>
          {isLoggedIn ? (
            <NavLink to="/" onClick={handleLogout}>
              Se déconnecter
            </NavLink>
          ) : (
            <NavLink to="/login">Se connecter</NavLink>
          )}
        </li>
      </ul>
    </div>
  );
}

export default Navbar;
