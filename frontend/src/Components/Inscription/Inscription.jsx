import React, { useEffect, useRef, useState, useContext } from "react";
import axios from "axios";
import { useNavigate, NavLink } from "react-router-dom";
import "./inscription.css";
import { BiHelpCircle } from "react-icons/bi";
import UserContext from "../../contexts/UserContext";
import FormContext from "../../contexts/FormContext";

const textInputStyle = {
  width: "90%",
  padding: "0.5rem 1rem",
  border: "none",
  borderBottom: "1px solid #645979",
  outline: "none",
  borderRadius: "5px",
  fontSize: "1rem",
  fontWeight: "bold",
};

const EMAIL_REGEX = /^[A-Za-z0-9._%+-]+@([A-Za-z0-9-]+\.)+[A-Za-z]{2,4}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

function Inscription() {
  const firstnameRef = useRef(); // ref in input
  const errRef = useRef();

  const [errMsg, setErrMsg] = useState("");

  const { setUserId, setFirstname, userId, firstname, setIsLoggedIn } =
    useContext(UserContext);
  const { formUserValues, setFormUserValues } = useContext(FormContext);

  const [validMail, setValidMail] = useState(false);
  const [mailFocus, setMailFocus] = useState(false);

  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [isTooltipVisiblePwd, setIsTooltipVisiblePwd] = useState(false);
  const [isTooltipVisiblePwd2, setIsTooltipVisiblePwd2] = useState(false);

  const [canPostFlight, setCanPostFlight] = useState(false);

  const navigate = useNavigate();

  const [formInscription, setFormInscription] = useState({
    firstname: "",
    email: "",
    pwd: "",
  });

  useEffect(() => {
    setUserId(null);
    setFirstname(null);
  }, []);

  useEffect(() => {
    firstnameRef.current.focus();
  }, []);

  useEffect(() => {
    const result = EMAIL_REGEX.test(formInscription.email);
    setValidMail(result);
  }, [formInscription.email]);

  useEffect(() => {
    const result = PWD_REGEX.test(formInscription.pwd); // return bool if respect regex or not
    setValidPwd(result);
    const match = formInscription.pwd === matchPwd; // return bool
    setValidMatch(match);
  }, [formInscription.pwd, matchPwd]);

  const [formSent, setFormSent] = useState(false);

  const handleChangeFormInscription = (evt) => {
    evt.preventDefault();
    setFormInscription({
      ...formInscription,
      [evt.target.name]: evt.target.value,
    });
  };

  const submitInscription = (evt) => {
    evt.preventDefault();
    // secure
    const v1 = EMAIL_REGEX.test(formInscription.email);
    const v2 = PWD_REGEX.test(formInscription.pwd);
    if (!v1 || !v2) {
      setErrMsg("Invalid Entry");
      return;
    }
    if (matchPwd) {
      axios
        .post(`${import.meta.env.VITE_BACKEND_URL}/users`, formInscription)
        .then(() => {
          setFormSent(true);
          setIsLoggedIn(true);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  const postFlight = async () => {
    if (formUserValues.user_iduser) {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/flights`,
          formUserValues
        );
        setTimeout(() => {
          navigate("/userprofil");
        }, 2000);
      } catch (err) {
        console.error(err);
      }
    } else {
      navigate("/FlightFormPage");
    }
  };

  const fetchDataUser = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/users/email`,
        {
          params: { email: formInscription.email },
        }
      );

      const resultUserId = response.data?.iduser;
      setUserId(resultUserId);
      setFormUserValues({ ...formUserValues });
      const resultUserFirstname = response.data?.firstname;
      setFirstname(resultUserFirstname);
      if (formUserValues.user_iduser === null) {
        formUserValues.user_iduser = resultUserId; // edit user_iduser with the real user id
        postFlight();
      } else {
        navigate("/FlightFormPage");
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (formSent) {
      fetchDataUser();
    }
  }, [formSent]);

  const indiceFormPwd2 = () => {
    if (isTooltipVisiblePwd) {
      setIsTooltipVisiblePwd(false);
      setIsTooltipVisiblePwd2(!isTooltipVisiblePwd2);
    } else {
      setIsTooltipVisiblePwd2(!isTooltipVisiblePwd2);
    }
  };

  const indiceFormPwd = () => {
    if (isTooltipVisiblePwd2) {
      setIsTooltipVisiblePwd2(false);
      setIsTooltipVisiblePwd(!isTooltipVisiblePwd);
    } else {
      setIsTooltipVisiblePwd(!isTooltipVisiblePwd);
    }
  };

  return (
    <div className="flex flex-col items-center mx-3 rounded-lg">
      <p
        ref={errRef}
        className={errMsg ? "visible" : "hidden"}
        aria-live="assertive"
      >
        {errMsg}
      </p>
      <form
        className="flex flex-col w-5/6 md:flex-row md:w-full md:flex-wrap md:justify-around"
        onSubmit={submitInscription}
      >
        <div className="flex flex-col items-center mb-5">
          <label
            htmlFor="firstname"
            className="font-bold text-xl font-display text-center mb-2"
          >
            Prénom
          </label>
          <input
            type="text"
            style={textInputStyle}
            ref={firstnameRef}
            name="firstname"
            value={formInscription.firstname}
            onChange={handleChangeFormInscription}
            required
          />
        </div>
        <div className="flex flex-col items-center mb-5">
          <label
            htmlFor="email"
            className="font-bold font-display text-xl text-center mb-2"
          >
            <p
              className={`${
                formInscription.email === ""
                  ? "text-black"
                  : validMail
                  ? "text-green-900"
                  : "text-red-600 "
              }`}
            >
              Adresse e-mail
            </p>
          </label>

          <input
            type="email"
            id="email"
            style={textInputStyle}
            name="email"
            value={formInscription.email}
            onChange={handleChangeFormInscription}
            onFocus={() => setMailFocus(true)}
            onBlur={() => setMailFocus(false)}
            required
          />
        </div>

        <div className="flex flex-col items-center mb-5">
          <label
            htmlFor="password"
            className="font-bold text-xl flex font-display text-center mb-2"
          >
            <p
              className={`${
                formInscription.pwd === ""
                  ? "text-black"
                  : validPwd
                  ? "text-green-900"
                  : "text-red-600 "
              }`}
            >
              Mot de passe&nbsp;
            </p>
            <button
              type="button"
              className="pt-1 hover:cursor-pointer"
              onClick={indiceFormPwd}
            >
              <BiHelpCircle aria-label="Help" role="img" />
            </button>
            <p
              className={`${
                isTooltipVisiblePwd
                  ? "visible backdrop-filter bg-[#f2eeb38c] backdrop-blur-xl rounded-xl text-sm absolute h-32 p-1 right-0 top-0 flex flex-col items-center justify-center md:w-56 md:h-44 md:top-48 md:right-[365px]"
                  : "hidden"
              }`}
            >
              Entre 8 et 24 caractères. <br />
              Doit inclure au moins 1 lettre majuscule, 1 lettre minuscule, 1
              chiffre et 1 caractère spécial.
              <br />
              Caractères spéciaux acceptés : <br />
              <div>
                <span aria-label="exclamation mark">! &nbsp; </span>
                <span aria-label="at symbol">@ &nbsp; </span>
                <span aria-label="hashtag"># &nbsp; </span>
                <span aria-label="dollar sign">$ &nbsp; </span>
                <span aria-label="percent">% &nbsp; </span>
              </div>
            </p>
          </label>

          <input
            type="password"
            id="password"
            name="pwd"
            value={formInscription.pwd}
            onChange={handleChangeFormInscription}
            style={textInputStyle}
            onFocus={() => setPwdFocus(true)}
            onBlur={() => setPwdFocus(false)}
            required
          />
        </div>
        <div className="flex flex-col items-center mb-5">
          <label
            htmlFor="confirm_pwd"
            className="font-bold text-xl flex font-display text-center mb-2"
          >
            <p
              className={`${
                matchPwd === ""
                  ? "text-black"
                  : validMatch
                  ? "text-green-900"
                  : "text-red-600 "
              }`}
            >
              Confirmer le mot de passe&nbsp;
            </p>
            <button
              type="button"
              className="pt-1 hover:cursor-pointer"
              onClick={indiceFormPwd2}
            >
              <BiHelpCircle aria-label="Help" role="img" />
            </button>
            <p
              className={`${
                isTooltipVisiblePwd2
                  ? "visible backdrop-filter bg-[#f2eeb38c] backdrop-blur-xl rounded-xl text-sm absolute h-32 p-2 right-0 top-0 flex items-center md:w-56 md:top-48 md:right-14"
                  : "hidden"
              }`}
            >
              Le mot de passe de confirmation doit être identique au mot de
              passe précédemment saisi.
            </p>
          </label>

          <input
            type="password"
            id="confirm_pwd"
            name="pwd"
            onChange={(e) => setMatchPwd(e.target.value)}
            onFocus={() => setMatchFocus(true)}
            onBlur={() => setMatchFocus(false)}
            style={textInputStyle}
            required
          />
        </div>
        <NavLink
          to="/login"
          className="hover:cursor-pointer text-center -mt-5 md:-mt-0 md:font-display"
        >
          Déjà inscrit ? Clique ici pour te connecter
        </NavLink>
        <div className="w-full items-center flex justify-center mb-5">
          <button
            disabled={!!(!validMail || !validPwd || !validMatch)}
            type="submit"
            className="rounded-full hover:text-white font-bold bg-[#6C8C26] py-2 px-8 w-32 mt-5 mb-5"
          >
            Valider
          </button>
        </div>
      </form>
    </div>
  );
}

export default Inscription;
