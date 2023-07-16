import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../Contexts/UserContext";
import "./Home.css";

function Home() {
  const { user, setUser } = useContext(UserContext);

  const navigate = useNavigate();

  const handleClickToLogin = () => {
    navigate("/login");
  };

  return (
    <div>
      <h2>THE CARBON PROJECT</h2>

      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum tenetur
        tempora assumenda eius deserunt consequuntur iusto suscipit quaerat
        quasi consequatur voluptatum illo id eaque fugiat accusantium omnis,
        laboriosam iure mollitia facilis sed quia optio deleniti porro?
        Provident culpa deserunt quibusdam nostrum accusamus enim vitae.
        Repellat sapiente libero iure quasi earum eaque aliquid nobis
        necessitatibus non rem accusamus ad esse ullam maxime blanditiis
        cupiditate ab harum praesentium, vel itaque voluptas sint quia? Minus
        soluta repellat nihil earum!
      </p>

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
