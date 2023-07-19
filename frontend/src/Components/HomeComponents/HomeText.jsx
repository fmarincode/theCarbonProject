import React, { useState } from "react";
import Inscription from "../Inscription/Inscription";

function HomeText() {
  const [inscriptionComponent, setInscriptionComponent] = useState(false);

  const inscriptionBtn = () => {
    setInscriptionComponent(true);
  };

  return (
    <div className="flex flex-col items-center space-y-10">
      {!inscriptionComponent ? (
        <>
          <p className="text-[#242422] text-justify pr-10 pl-10 font-bold">
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
          <button
            type="button"
            className="rounded-full font-bold pt-4 pb-4 pl-8 pr-8 bg-[#D96E30] w-32 mt-10"
            onClick={inscriptionBtn}
          >
            S'inscrire
          </button>
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
