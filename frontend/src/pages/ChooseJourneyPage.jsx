import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../contexts/UserContext";

function ChooseJourneyPage() {
  const { firstname } = useContext(UserContext);

  const navigate = useNavigate();

  const toPlaneForm = () => {
    navigate("/FlightFormPage");
  };
  const toCarForm = () => {
    navigate("/CarFormPage");
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="h-[75vh] w-[100vw] pt-8 pb-8 bg-[#c4c589ba] flex flex-col items-center mx-3 rounded-xl border border-opacity-30 backdrop-filter backdrop-blur-sm md:min-w-[65vw] md:max-w-[50vw] md:max-h-[40vh]">
        <h2 className="text-[#274001] font-display font-bold w-3/4 text-center text-2xl drop-shadow-lg">
          {firstname
            ? `${firstname}, quel moyen de transport utilises-tu ?`
            : "Quel moyen de transport utilises-tu ?"}
        </h2>
        <div className="flex justify-around pt-10">
          {/* add icons */}

          <button
            type="button"
            className="rounded-full hover:text-white font-bold mr-2 pt-3 pb-3 pl-6 pr-6 bg-[#6C8C26] w-28 md:w-32 md:mt-10"
            onClick={toPlaneForm}
          >
            Avion
          </button>
          <button
            type="button"
            className="rounded-full hover:text-white font-bold pt-3 pb-3 pl-6 pr-6 bg-[#6C8C26] w-28 md:w-32 md:mt-10"
            onClick={toCarForm}
          >
            Voiture
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChooseJourneyPage;
