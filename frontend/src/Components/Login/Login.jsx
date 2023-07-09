import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import "./login.css";
import { UserContext } from "../../Contexts/UserContext";

function Login() {
  const { user, setUser } = useContext(UserContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmitForm = (event) => {
    event.preventDefault();
    setUser(email);
  };

  return (
    <div className="loginComponentContainer">
      <h2>Login component</h2>

      {user ? <h3> Welcome {user}</h3> : <h3>Entres tes identifiants</h3>}

      <form onSubmit={handleSubmitForm}>
        <div>
          <label htmlFor="email">E-mail:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Mot de passe:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
        </div>
        <Link to="/Inscription" className="suggestInscription">
          Pas encore inscrit ?{" "}
        </Link>
        <button type="submit">Se connecter</button>
      </form>
    </div>
  );
}

export default Login;
