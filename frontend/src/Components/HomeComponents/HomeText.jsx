import React, { useState } from "react";
import Inscription from "../Inscription/Inscription";

function HomeText() {
  const [inscriptionComponent, setInscriptionComponent] = useState(false);

  const inscriptionBtn = () => {
    setInscriptionComponent(true);
  };

  return (
    <div className="flex flex-col items-center space-y-5 min-h-[55.5vh] md:space-y-10">
      {!inscriptionComponent ? (
        <>
          <p className="text-[#242422] text-justify px-5 md:pr-10 md:pl-10 font-bold text-lg drop-shadow-lg">
            Bonjour, si tu es arrivé jusqu'ici c'est que notre ami Google fait
            très bien son boulot. Ici, grâce à l'API de Carbon Interface, tu vas
            pouvoir calculer le poids du rejet en CO2 de tes déplacements en
            avion. Mais avant ça, un peu de latin : Provident culpa deserunt
            quibusdam nostrum accusamus enim vitae. Repellat sapiente libero
            necessitatibus non rem accusamus ad esse ullam maxime blanditiis
            cupiditate ab harum praesentium!
          </p>
          <div>
            <button
              type="button"
              className="rounded-full font-bold pt-3 pb-3 pl-6 pr-6 bg-[#6C8C26] w-28 mt-5 mb-5 md:w-32 md:mt-10 md:relative md:bottom-10"
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
