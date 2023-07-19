import React from "react";
import axios from "axios";

const textInputStyle = {
  width: "75%",
  padding: "5px 10px",
  border: "none",
  borderBottom: "1px solid #645979",
  outline: "none",
  borderRadius: "5px",
  fontSize: "1rem",
};

function Inscription() {
  const submitInscription = () => {
    axios.post();
  };

  return (
    <div className="flex flex-col items-center">
      <form
        className="flex flex-row justify-around mt-6"
        onSubmit={submitInscription}
      >
        <div className="flex flex-col items-center">
          <label htmlFor="firstname" className="font-bold text-center mb-2">
            Prénom
          </label>
          <input type="text" style={textInputStyle} required />
        </div>
        <div className="flex flex-col items-center">
          <label htmlFor="lastname" className="font-bold text-center mb-2">
            Nom
          </label>
          <input type="text" style={textInputStyle} required />
        </div>
        <div className="flex flex-col items-center">
          <label htmlFor="email" className="font-bold text-center mb-2">
            E-mail
          </label>
          <input type="email" id="email" style={textInputStyle} required />
        </div>
        <div className="flex flex-col items-center">
          <label htmlFor="password" className="font-bold text-center mb-2">
            Mot de passe
          </label>
          <input
            type="password"
            id="password"
            style={textInputStyle}
            required
          />
        </div>
      </form>
      <button
        type="submit"
        className="rounded-full font-bold pt-4 pb-4 pl-8 pr-8 bg-[#D96E30] w-32 mt-11"
      >
        Valider
      </button>
    </div>
  );
}

export default Inscription;
