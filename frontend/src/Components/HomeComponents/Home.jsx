import React from "react";
import HomeText from "./HomeText";

function Home() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="min-w-[65%] max-w-[65%] min-h-[50vh] bg-[#BEBF93] flex flex-col mx-auto my-auto rounded-lg">
        <h2 className="text-[#D96E30] flex items-center font-bold justify-center text-5xl mb-10 mt-5 ">
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
