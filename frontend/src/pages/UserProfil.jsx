import React from "react";
import ResumeFlight from "../Components/Profil/ResumeFlight";

function UserProfil() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="h-[75vh] w-[100vw] bg-[#c4c589ba] flex flex-col mx-3 my-auto rounded-xl border border-opacity-30 backdrop-filter backdrop-blur-sm md:min-w-[65vw] md:max-w-[50vw] md:max-h-[40vh]">
        <ResumeFlight />
      </div>
    </div>
  );
}

export default UserProfil;
