import React from "react";

function Inscription() {
  return (
    <div className="inscriptionComponentContainer">
      <h2>Inscription component</h2>

      <form>
        <div>
          <label htmlFor="firstname">Prénom :</label>
          <input type="text" placeholder="Jean" required />
        </div>
        <div>
          <label htmlFor="lastname">Nom :</label>
          <input type="text" placeholder="Dupont" required />
        </div>
        <div>
          <label htmlFor="email">E-mail:</label>
          <input type="email" id="email" placeholder="ton email" required />
        </div>
        <div>
          <label htmlFor="password">Mot de passe:</label>
          <input
            type="password"
            id="password"
            placeholder="ton mot de passe"
            required
          />
        </div>

        <button type="submit">S'inscrire</button>
      </form>
    </div>
  );
}

export default Inscription;
