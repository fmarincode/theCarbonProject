import React, { useRef, useEffect, useState, useContext } from "react";
import { NavLink } from "react-router-dom";
import AuthContext from "../../contexts/AuthContext";
import earth from "../../assets/earth.png";
import axios from "../../api/axios";

function Login() {
  const { setAuth } = useContext(AuthContext);
  const userRef = useRef();
  const errRef = useRef();

  const [formLogin, setFormLogin] = useState({
    email: "",
    pwd: "",
  });
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  const [isRotating, setIsRotating] = useState(false);
  const [formSent, setFormSent] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [formLogin]);

  const handleChangeFormLogin = (evt) => {
    evt.preventDefault();
    setFormLogin({
      ...formLogin,
      [evt.target.name]: evt.target.value,
    });
  };

  const submitAuthent = async (evt) => {
    evt.preventDefault();

    try {
      const response = await axios.post(
        "/login",
        JSON.stringify({
          email: formLogin.email,
          pwd: formLogin.pwd,
        }),
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      // console.log(JSON.stringify(response?.data));

      setAuth({
        idUser: response.data.iduser,
        firstname: response.data.firstname,
      });

      setFormLogin({
        email: "",
        pwd: "",
      });

      setSuccess(true);
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No server response");
      } else if (err.response?.status === 400) {
        setErrMsg("Missing email or password");
      } else if (err.response?.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login failed");
      }
      errRef.current.focus();
    }

    /* fetch(`${import.meta.env.VITE_BACKEND_URL}/login`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formLogin)
    }) */
  };

  return (
    <div className="flex flex-col items-center pt-5 mx-3 rounded-lg">
      {success ? (
        <section>
          <h3>Tu es maintenant connecté !</h3>
          <p>Tu vas être redirigé...</p>
          <p>Clique ici pour retourner à la page principale</p>
        </section>
      ) : (
        <>
          <p
            ref={errRef}
            className={errMsg ? "errMsg" : "offscreen"}
            aria-live="assertive"
          >
            {errMsg}
          </p>
          <form
            className="flex flex-col w-3/4 md:flex-row md:w-full md:flex-wrap md:justify-around"
            onSubmit={submitAuthent}
          >
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
                ref={userRef}
                className="w-full px-4 py-2 border border-gray-300 font-bold rounded-md outline-none focus:border-indigo-500"
                name="email"
                value={formLogin.email}
                onChange={handleChangeFormLogin}
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
                value={formLogin.pwd}
                onChange={handleChangeFormLogin}
                className="w-full px-4 py-2 border border-gray-300 rounded-md font-bold outline-none focus:border-indigo-500"
                required
              />
            </div>
            <NavLink
              to="/inscription"
              className="hover:cursor-pointer text-center"
            >
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
        </>
      )}
    </div>
  );
}

export default Login;
