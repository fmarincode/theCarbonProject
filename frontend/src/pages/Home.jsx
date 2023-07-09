import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../Contexts/UserContext";

function Home() {
  const { user, setUser } = useContext(UserContext);

  const navigate = useNavigate();

  const handleClickToLogin = () => {
    navigate("/login");
  };
  return (
    <div>
      <h2>Bienvenue sur la Home Page</h2>
      <h3>{user}</h3>
      <div>
        {user ? (
          <button
            type="button"
            onClick={() => {
              setUser(null);
            }}
          >
            Logout
          </button>
        ) : (
          <button type="button" onClick={handleClickToLogin}>
            Login
          </button>
        )}
      </div>
    </div>
  );
}

export default Home;
