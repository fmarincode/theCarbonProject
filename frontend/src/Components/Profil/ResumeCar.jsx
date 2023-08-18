import React, { useContext, useState, useEffect } from "react";
import { AiFillCar } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import UserContext from "../../contexts/UserContext";

function ResumeFlight() {
  const navigate = useNavigate();
  const { firstname, userId } = useContext(UserContext);
  const [departure, setDeparture] = useState([]);
  const [arrival, setArrival] = useState([]);
  const [totalKgEmission, setTotalKgEmission] = useState([]);

  const navigateToHome = () => {
    navigate("/");
  };

  useEffect(() => {
    if (userId) {
      axios
        .get(`${import.meta.env.VITE_BACKEND_URL}/cars/${userId}`)
        .then((response) => {
          const newArrival = [];
          const newDeparture = [];
          const newTotalKgEmission = [];

          for (let i = 0; i < response.data.length; i++) {
            const carData = response.data[i];
            newArrival.push(carData.arrival);
            newDeparture.push(carData.departure);
            newTotalKgEmission.push(carData.totalKgEmission);
          }

          setArrival(newArrival);
          setDeparture(newDeparture);
          setTotalKgEmission(newTotalKgEmission);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [userId]);

  return (
    <div className="flex flex-col items-center mx-3 rounded-lg">
      <h2 className="text-[#274001] font-display flex flex-wrap items-center font-bold w-full text-center justify-center text-4xl mb-5 mt-5">
        {firstname
          ? `${firstname}, le résumé de tes trajets`
          : "Le résumé des trajets"}
      </h2>

      <div className="overflow-y-auto h-[48vh] flex flex-col items-center md:flex-row md:overflow-x-auto md:w-3/4 md:h-60 md:scrollbar md:scrollbar-track-[#EEF279] md:scrollbar-h-4 md:scrollbar-thumb-[#274001] md:scrollbar-track-rounded-md md:-mt-5">
        {!userId && departure.length < 1 ? (
          <p className="font-display text-2xl text-center md:ml-[12vw] md:-mt-10">
            Tu n'as pas encore de trajets sauvegardés !
          </p>
        ) : (
          <>
            {departure.map((cityDepart, index) => (
              <div
                key={index}
                className="flex flex-col items-center w-3/4 bg-[#D9D7C5] rounded-md mx-5 mb-4 p-5"
              >
                <p className="text-justify flex items-center mb-1 text-xl">
                  {cityDepart} <AiFillCar className="ml-2 mr-2" />{" "}
                  {arrival[index]}
                </p>
                <p className="text-justify flex font-display items-center mb-1 text-xl">
                  {totalKgEmission[index]}kg CO2
                </p>
              </div>
            ))}
          </>
        )}
      </div>

      <div className="flex justify-center">
        <button
          type="button"
          onClick={navigateToHome}
          className="rounded-full hover:text-white font-bold pt-4 pb-4 pl-8 pr-8 bg-[#274001d8] text-[#EEF279] w-32 mt-4 mr-5"
        >
          Accueil
        </button>

        {!userId ? (
          <button
            type="button"
            onClick={() => navigate("/login")}
            className="rounded-full hover:text-white font-bold bg-[#274001d8] text-[#EEF279] w-32 mt-4"
          >
            Se connecter
          </button>
        ) : (
          <button
            type="button"
            onClick={() => navigate("/CarFormPage")}
            className="rounded-full hover:text-white font-bold bg-[#274001d8] text-[#EEF279] w-32 mt-4"
          >
            Calculer
          </button>
        )}
      </div>
    </div>
  );
}

export default ResumeFlight;
