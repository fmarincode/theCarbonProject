import React from "react";
import { FaPlane } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function ResumeFlight() {
  const navigate = useNavigate();

  const navigateToHome = () => {
    navigate("/");
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="min-w-[65%] max-w-[65%] min-h-[50vh] bg-[#BEBF93] flex items-center flex-col mx-auto my-auto rounded-lg">
        <h2 className="text-[#D96E30] flex items-center font-bold justify-center text-5xl mb-10 mt-5">
          [Prénom], le résumé de tes trajets
        </h2>
        <div className="flex flex-row w-3/4 justify-around bg-[#D9D7C5] rounded-md m-8 p-8">
          <p className="text-justify flex items-center">
            [Départ] <FaPlane className="ml-2 mr-2" /> [Arrivée]
          </p>
          <p>[x] passagers</p>
          <p>[result] CO2</p>
        </div>
        <button
          type="button"
          onClick={navigateToHome}
          className="rounded-full font-bold pt-4 pb-4 pl-8 pr-8 bg-[#D96E30] w-32 mt-10"
        >
          Accueil
        </button>
      </div>
    </div>
  );
}

export default ResumeFlight;
