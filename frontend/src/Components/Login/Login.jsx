import React, { useRef, useEffect, useState, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import UserContext from "../../contexts/UserContext";
import FormContext from "../../contexts/FormContext";
import earth from "../../assets/earth_colorIN3.png";

function Login() {
  const { setUserId, setFirstname, firstname, userId, setIsLoggedIn } =
    useContext(UserContext);

  const { formUserValues } = useContext(FormContext);

  const errRef = useRef();

  const [formLogin, setFormLogin] = useState({
    email: "",
    pwd: "",
  });
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  const [isRotating, setIsRotating] = useState(false);
  const [formSent, setFormSent] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    setUserId(null);
    setFirstname(null);
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
        `${import.meta.env.VITE_BACKEND_URL}/login`,
        formLogin
      );

      setUserId(response.data.iduser);
      setFirstname(response.data.firstname);
      setIsLoggedIn(true);
      setIsRotating(true);
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
  };

  useEffect(() => {
    if (success) {
      axios
        .get(`${import.meta.env.VITE_BACKEND_URL}/users/email`, {
          params: { email: formLogin.email },
        })
        .then((response) => {
          const resultUserId = response.data?.iduser; // permet de récupérer l'id si il y en a un
          setUserId(resultUserId);
          const resultUserFirstname = response.data?.firstname; // permet de récupérer firstname si il y en a
          setFirstname(resultUserFirstname);
          setFormLogin({
            email: "",
            pwd: "",
          });
        })
        .catch((err) => {
          console.error(err);
        });

      setTimeout(() => {
        navigate("/userprofil");
      }, 3000);
    }
  }, [success]);

  return (
    <div className="flex flex-col items-center pt-5 mx-3 rounded-lg md:pt-0">
      <p
        ref={errRef}
        className={errMsg ? "errMsg" : "offscreen"}
        aria-live="assertive"
      >
        {errMsg}
      </p>
      <form className="flex flex-col w-3/4" onSubmit={submitAuthent}>
        <div className="flex flex-col items-center mb-5">
          <label
            htmlFor="email"
            className="font-bold font-display text-xl text-center mb-2"
          >
            Adresse e-mail
          </label>
          <input
            type="email"
            id="email"
            className="w-full px-4 py-2 border border-gray-300 font-bold rounded-md outline-none focus:border-indigo-500 md:w-[30%]"
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
            className="w-full px-4 py-2 border border-gray-300 rounded-md font-bold outline-none focus:border-indigo-500 md:w-[30%]"
            required
          />
        </div>
        <NavLink
          to="/inscription"
          className="hover:cursor-pointer text-center font-bold font-display"
        >
          Pas encore inscrit ? Clique ici pour t'inscrire
        </NavLink>
        <div className="w-full items-center flex justify-center mb-5">
          <button
            type="submit"
            className="rounded-full hover:text-white font-bold py-2 px-8 w-32 mt-5 mb-5 bg-[#274001d8] text-[#EEF279]"
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
