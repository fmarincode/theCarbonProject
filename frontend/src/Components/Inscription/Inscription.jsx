import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import UserContext from "../../contexts/UserContext";

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
    <div className="flex flex-col items-center">
      <form
        className="flex flex-row flex-wrap justify-around mt-6"
        onSubmit={submitInscription}
      >
        <div className="flex flex-col items-center">
          <label htmlFor="firstname" className="font-bold text-center mb-2">
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
        <div className="flex flex-col items-center">
          <label htmlFor="email" className="font-bold text-center mb-2">
            E-mail
          </label>
          <input
            type="email"
            id="email"
            style={textInputStyle}
            name="email"
            value={formInscription.email}
            onChange={handleChangeFormInscription}
            required
          />
        </div>
        <div className="flex flex-col items-center">
          <label htmlFor="password" className="font-bold text-center mb-2">
            Mot de passe
          </label>
          <input
            type="password"
            id="password"
            name="pwd"
            value={formInscription.pwd}
            onChange={handleChangeFormInscription}
            style={textInputStyle}
            required
          />
        </div>
        <div className="w-full flex flex-col items-center">
          <button
            type="submit"
            className={`rounded-full font-bold pt-4 pb-4 pl-8 pr-8 w-32 mt-11 ${
              formSent ? "bg-[#8A8C46]" : "bg-[#D96E30]"
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
