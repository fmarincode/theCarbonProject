import React from "react";
import HomeText from "./HomeText";

function Home() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className=" md:min-w-[65%] md:max-w-[65%] min-h-[50vh] bg-[#c4c589ba] flex flex-col mx-3 my-auto rounded-lg">
        <h2 className="text-[#274001] flex items-center font-bold justify-center text-center text-4xl md:text-6xl mb-5 mt-10 md:mb-10 md:mt-5">
          THE CARBON PROJECT
        </h2>
        <div className="flex-1">
          <HomeText />
        </div>
      </div>
    </div>
  );
}

export default Home;
