import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import UserContext from "../../contexts/UserContext";

const textInputStyle = {
  width: "100%",
  padding: "0.5rem 1rem",
  border: "none",
  borderBottom: "1px solid #645979",
  outline: "none",
  borderRadius: "5px",
  fontSize: "1rem",
};

function Inscription() {
  const { setUserId, setFirstname } = useContext(UserContext);

  const navigate = useNavigate();

  const [formInscription, setFormInscription] = useState({
    firstname: "",
    email: "",
    pwd: "",
  });

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
    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/users`, formInscription)
      .then(() => {
        setFormSent(true);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    if (formSent) {
      axios
        .get(`${import.meta.env.VITE_BACKEND_URL}/users`, {
          params: { email: formInscription.email },
        })
        .then((response) => {
          const resultUserId = response.data[0]?.iduser; // permet de récupérer l'id si il y en a un
          setUserId(resultUserId);
          const resultUserFirstname = response.data[0]?.firstname; // permet de récupérer l'id si il y en a un
          setFirstname(resultUserFirstname);
        })
        .catch((err) => {
          console.error(err);
        });

      setTimeout(() => {
        navigate("/FlightFormPage");
      }, 2000);
    }
  }, [formSent]);

  return (
    <div className="min-h-[55.5vh] flex flex-col mx-3 my-auto rounded-lg">
      <form
        className="flex flex-col mt-6 w-full md:flex-row md:w-full md:flex-wrap md:justify-around"
        onSubmit={submitInscription}
      >
        <div className="flex flex-col items-center mb-5">
          <label htmlFor="firstname" className="font-bold  text-center mb-2">
            Prénom
          </label>
          <input
            type="text"
            style={textInputStyle}
            name="firstname"
            value={formInscription.firstname}
            onChange={handleChangeFormInscription}
            required
          />
        </div>
        <div className="flex flex-col  items-center mb-5">
          <label htmlFor="email" className="font-bold  text-center mb-2">
            E-mail
          </label>
          <input
            type="email"
            id="email"
            className="w-full px-4 py-2 border border-gray-300 rounded-md outline-none focus:border-indigo-500"
            name="email"
            value={formInscription.email}
            onChange={handleChangeFormInscription}
            required
          />
        </div>
        <div className="flex flex-col  items-center mb-5">
          <label htmlFor="password" className="font-bold  text-center mb-2">
            Mot de passe
          </label>
          <input
            type="password"
            id="password"
            name="pwd"
            value={formInscription.pwd}
            onChange={handleChangeFormInscription}
            className="w-full px-4 py-2 border border-gray-300 rounded-md outline-none focus:border-indigo-500"
            required
          />
        </div>
        <div className="w-full items-center flex justify-center mb-5 md:mt-10">
          <button
            type="submit"
            className={`rounded-full font-bold py-2 px-8 w-32 mt-5 mb-5 ${
              formSent ? "bg-[#8A8C46]" : "bg-[#6C8C26]"
            }`}
          >
            Valider
          </button>
        </div>
      </form>
    </div>
  );
}

export default Inscription;
