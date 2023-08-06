import React from "react";
import CarbonEmissionForm from "../Components/Form/CarbonEmissionForm";

function FlightFormPage() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="h-[75vh] w-[100vw] pt-8 pb-8 bg-[#c4c589ba] flex flex-col items-center mx-3 rounded-xl border border-opacity-30 backdrop-filter backdrop-blur-sm md:min-w-[65vw] md:max-w-[50vw] md:max-h-[40vh]">
        <CarbonEmissionForm />
      </div>
    </div>
  );
}

export default FlightFormPage;
