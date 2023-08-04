import React from "react";
import Inscription from "../Components/Inscription/Inscription";

function InscriptionPage() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="h-[75vh] bg-[#c4c589ba] flex flex-col mx-3 rounded-xl border border-opacity-30 backdrop-filter backdrop-blur-sm md:min-w-[65vw] md:max-w-[50vw] md:max-h-[40vh]">
        <h2 className="text-[#274001] flex items-center font-display px-5 font-bold justify-center text-center text-4xl md:text-6xl mb-5 pt-1 md:mb-10 md:mt-5 drop-shadow-lg hover:cursor-pointer">
          Inscris-toi pour conserver tes voyages
        </h2>
        <Inscription />
      </div>
    </div>
  );
}

export default InscriptionPage;
