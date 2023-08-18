import React, { useState } from "react";
import ResumeCar from "../Components/Profil/ResumeCar";
import ResumeFlight from "../Components/Profil/ResumeFlight";

function UserProfil() {
  const [showComponent, setShowComponent] = useState(true);

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="h-[75vh] w-[100vw] bg-[#c4c589ba] flex flex-col mx-3 my-auto rounded-xl border-x border-b border-opacity-30 backdrop-filter backdrop-blur-sm md:min-w-[65vw] md:max-w-[50vw] md:max-h-[40vh]">
        {showComponent ? <ResumeCar /> : <ResumeFlight />}

        <div className="flex w-full h-full justify-around items-end md:relative md:bottom-[45.5vh]">
          <div className="flex w-full h-16 justify-around items-center border-t-2 border-[#EEF279] rounded-xl bg-[#274001d8]">
            <button
              type="button"
              className="text-[#EEF279] font-display font-bold text-center text-2xl w-full border-r border-[#EEF279] drop-shadow-lg hover:cursor-pointer p-2"
              onClick={() => setShowComponent(false)}
            >
              AVION
            </button>
            <button
              type="button"
              className="text-[#EEF279] font-display font-bold text-center text-2xl w-full drop-shadow-lg hover:cursor-pointer"
              onClick={() => setShowComponent(true)}
            >
              VOITURE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfil;
