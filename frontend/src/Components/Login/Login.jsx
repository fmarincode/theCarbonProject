import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import earth from "../../assets/earth.png";

function Login() {
  const [isRotating, setIsRotating] = useState(false);

  const [formSent, setFormSent] = useState(false);

  return (
    <div className="flex flex-col items-center pt-5 mx-3 rounded-lg">
      <form className="flex flex-col w-3/4 md:flex-row md:w-full md:flex-wrap md:justify-around">
        <div className="flex flex-col  items-center mb-5">
          <label
            htmlFor="email"
            className="font-bold font-display text-xl text-center mb-2"
          >
            Adresse e-mail
          </label>
          <input
            type="email"
            id="email"
            className="w-full px-4 py-2 border border-gray-300 font-bold rounded-md outline-none focus:border-indigo-500"
            name="email"
            // value
            required
          />
        </div>
        <div className="flex flex-col  items-center mb-5">
          <label
            htmlFor="password"
            className="font-bold text-xl font-display text-center mb-2"
          >
            Mot de passe
          </label>
          <input
            type="password"
            id="password"
            name="pwd"
            // value
            className="w-full px-4 py-2 border border-gray-300 rounded-md font-bold outline-none focus:border-indigo-500"
            required
          />
        </div>
        <NavLink to="/inscription" className="hover:cursor-pointer text-center">
          Pas encore inscrit ? Clique ici pour t'inscrire
        </NavLink>
        <div className="w-full items-center flex justify-center mb-5">
          <button
            type="submit"
            className={`rounded-full hover:text-white font-bold py-2 px-8 w-32 mt-5 mb-5 ${
              formSent ? "bg-[#8A8C46]" : "bg-[#6C8C26]"
            }`}
          >
            Valider
          </button>
        </div>
      </form>
      <img
        src={earth}
        alt="earth"
        className={`h-16 absolute left-[42.5%] top-[88%] md:left-[90%] md:top-[75%] ${
          isRotating ? "animate-spin-slow" : ""
        }`}
      />
    </div>
  );
}

export default Login;
