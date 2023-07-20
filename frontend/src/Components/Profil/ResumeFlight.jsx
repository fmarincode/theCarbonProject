import React, { useContext, useState, useEffect } from "react";
import { FaPlane } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import UserContext from "../../contexts/UserContext";

function ResumeFlight() {
  const navigate = useNavigate();
  const { firstname, userId } = useContext(UserContext);
  const [departure, setDeparture] = useState();
  const [arrival, setArrival] = useState();
  const [passengers, setPassengers] = useState();
  const [totalKgEmission, setTotalKgEmission] = useState();

  const navigateToHome = () => {
    navigate("/");
  };

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/flights`, {
        params: { user_iduser: userId },
      })
      .then((response) => {
        const resultArrival = response.data[0]?.arrival; // permet de récupérer l'id si il y en a un
        setArrival(resultArrival);
        const resultDeparture = response.data[0]?.departure; // permet de récupérer l'id si il y en a un
        setDeparture(resultDeparture);
        const resultPassengers = response.data[0]?.passengers; // permet de récupérer l'id si il y en a un
        setPassengers(resultPassengers);
        const resultCO2 = response.data[0]?.totalKgEmission; // permet de récupérer l'id si il y en a un
        setTotalKgEmission(resultCO2);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="min-w-[95%] max-w-[95%] md:min-w-[65%] md:max-w-[65%] min-h-[72vh] bg-[#c4c589ba] flex flex-col w-full mx-3 items-center my-auto rounded-lg">
        <h2 className="text-[#274001] flex items-center font-bold w-3/4 text-center justify-center text-2xl mb-5 mt-10">
          {firstname}, le résumé de tes trajets
        </h2>
        <div className="flex flex-col items-center w-3/4 bg-[#D9D7C5] rounded-md m-5 p-5">
          <p className="text-justify flex items-center mb-1 text-xl">
            {departure} <FaPlane className="ml-2 mr-2" /> {arrival}
          </p>
          <p className="text-justify flex items-center mb-1 text-xl">
            {passengers} passagers
          </p>
          <p className="text-justify flex items-center mb-1 text-xl">
            {totalKgEmission}kg CO2
          </p>
        </div>
        <div className="flex justify-center">
          <button
            type="button"
            onClick={navigateToHome}
            className="rounded-full font-bold pt-4 pb-4 pl-8 pr-8 bg-[#6C8C26] w-32 mt-10"
          >
            Accueil
          </button>
        </div>
      </div>
    </div>
  );
}

export default ResumeFlight;
