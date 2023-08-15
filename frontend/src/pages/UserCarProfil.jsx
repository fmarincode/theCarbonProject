import React from "react";
import { useNavigate } from "react-router-dom";
import ResumeCar from "../Components/Profil/ResumeCar";

function UserCarProfil() {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="h-[75vh] w-[100vw] bg-[#c4c589ba] flex flex-col mx-3 my-auto rounded-xl border border-opacity-30 backdrop-filter backdrop-blur-sm md:min-w-[65vw] md:max-w-[50vw] md:max-h-[40vh]">
        <ResumeCar />

        <div className="flex w-full h-full justify-around items-end">
          <div className="flex w-full h-16 justify-around items-center border-t-2 border-[#EEF279] rounded-xl bg-[#274001d8]">
            <button
              type="button"
              className="text-[#EEF279] font-display font-bold text-center text-2xl drop-shadow-lg hover:cursor-pointer p-2"
              onClick={() => navigate("/flightprofil")}
            >
              AVION
            </button>
            <button
              type="button"
              className="text-[#EEF279] font-display font-bold text-center text-2xl drop-shadow-lg hover:cursor-pointer"
              onClick={() => navigate("/carprofil")}
            >
              VOITURE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserCarProfil;
