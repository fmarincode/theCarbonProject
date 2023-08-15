import React, { useContext, useState, useEffect } from "react";
import { FaPlane } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import UserContext from "../../contexts/UserContext";

function ResumeFlight() {
  const navigate = useNavigate();
  const { firstname, userId } = useContext(UserContext);
  const [departure, setDeparture] = useState([]);
  const [arrival, setArrival] = useState([]);
  const [passengers, setPassengers] = useState([]);
  const [totalKgEmission, setTotalKgEmission] = useState([]);

  const navigateToHome = () => {
    navigate("/");
  };

  useEffect(() => {
    if (userId) {
      axios
        .get(`${import.meta.env.VITE_BACKEND_URL}/flights/${userId}`)
        .then((response) => {
          const newArrival = [];
          const newDeparture = [];
          const newPassengers = [];
          const newTotalKgEmission = [];

          for (let i = 0; i < response.data.length; i++) {
            const flightData = response.data[i];
            newArrival.push(flightData.arrival);
            newDeparture.push(flightData.departure);
            newPassengers.push(flightData.passengers);
            newTotalKgEmission.push(flightData.totalKgEmission);
          }

          setArrival(newArrival);
          setDeparture(newDeparture);
          setPassengers(newPassengers);
          setTotalKgEmission(newTotalKgEmission);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [userId]);

  return (
    <div className="flex flex-col items-center mx-3 rounded-lg">
      <h2 className="text-[#274001] font-display flex flex-wrap items-center font-bold w-full text-center justify-center text-2xl mb-5 mt-10">
        {firstname}, le résumé de tes trajets
      </h2>
      <div className=" overflow-y-auto h-[50vh] flex flex-col justify-center items-center pt-60">
        {departure.length < 1 ? (
          <p>Tu n'as pas encore de trajets sauvegardés! </p>
        ) : (
          <>
            {departure.map((cityDepart, index) => (
              <div
                key={index}
                className="flex flex-col items-center w-3/4 relative top-24 bg-[#D9D7C5] rounded-md m-5 p-5 md:flex-row md:justify-around"
              >
                <p className="text-justify flex items-center mb-1 text-xl">
                  {cityDepart} <FaPlane className="ml-2 mr-2" />{" "}
                  {arrival[index]}
                </p>
                <p className="text-justify flex font-display items-center mb-1 text-xl">
                  {passengers[index]} passager(s)
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
          className="rounded-full hover:text-white font-bold pt-4 pb-4 pl-8 pr-8 bg-[#274001d8] text-[#EEF279] w-32 mt-4"
        >
          Accueil
        </button>
      </div>
    </div>
  );
}

export default ResumeFlight;
