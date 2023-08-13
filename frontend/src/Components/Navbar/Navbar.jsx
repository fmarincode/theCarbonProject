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
    <div className="fixed bottom-0 left-0 h-[5vh] w-full bg-[#c4c589ba] border border-opacity-30 backdrop-filter backdrop-blur-sm md:min-w-[65vw] md:max-w-[50vw] md:max-h-[40vh]">
      <ul className="flex justify-around items-center h-full">
        <li>
          <NavLink to="/">
            <img src={earth} alt="earth" className="h-8" />
          </NavLink>
        </li>
        <li>
          <NavLink to="/choose">Calculer</NavLink>
        </li>
        <li>
          <NavLink to="/profil">Profil</NavLink>
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
