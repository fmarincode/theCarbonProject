import React, { useState } from "react";
import Inscription from "../Inscription/Inscription";

function HomeText() {
  const [inscriptionComponent, setInscriptionComponent] = useState(false);

  const inscriptionBtn = () => {
    setInscriptionComponent(true);
  };

  return (
    <div className="flex flex-col items-center space-y-5 md:space-y-10">
      {!inscriptionComponent ? (
        <>
          <p className="text-[#242422] text-justify px-5 md:pr-10 md:pl-10 font-bold">
            Le CO2 est le principal gaz à effet de serre Lorem ipsum dolor sit
            amet consectetur adipisicing elit. Rerum tenetur tempora assumenda
            eius deserunt consequuntur iusto suscipit quaerat quasi consequatur
            voluptatum illo id eaque fugiat accusantium omnis, laboriosam iure
            mollitia facilis sed quia optio deleniti porro? Provident culpa
            deserunt quibusdam nostrum accusamus enim vitae. Repellat sapiente
            libero iure quasi earum eaque aliquid nobis necessitatibus non rem
            accusamus ad esse ullam maxime blanditiis cupiditate ab harum
            praesentium!
          </p>
          <div className="mb-5">
            <button
              type="button"
              className="rounded-full font-bold pt-3 pb-3 pl-6 pr-6 bg-[#D96E30] w-28 mt-5 mb-5 md:w-32 md:mt-10"
              onClick={inscriptionBtn}
            >
              S'inscrire
            </button>
          </div>
        </>
      ) : (
        <div>
          <Inscription />
        </div>
      )}
    </div>
  );
}

export default HomeText;
