import React from "react";
import Inscription from "../Components/Inscription/Inscription";

function InscriptionPage() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="h-[75vh] bg-[#c4c589ba] flex flex-col mx-3 my-auto rounded-xl border border-opacity-30 backdrop-filter backdrop-blur-sm md:min-w-[65vw] md:max-w-[50vw] md:max-h-[40vh]">
        <Inscription />
      </div>
    </div>
  );
}

export default InscriptionPage;
