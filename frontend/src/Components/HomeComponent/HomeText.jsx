import React, { useState } from "react";
import "./HomeText.css";
import Inscription from "../Inscription/Inscription";

function HomeText() {
  const [inscriptionComponent, setInscriptionComponent] = useState(false);

  const inscriptionBtn = () => {
    setInscriptionComponent(true);
  };

  return (
    <div className="homeText">
      {!inscriptionComponent ? (
        <>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum
            tenetur tempora assumenda eius deserunt consequuntur iusto suscipit
            quaerat quasi consequatur voluptatum illo id eaque fugiat
            accusantium omnis, laboriosam iure mollitia facilis sed quia optio
            deleniti porro? Provident culpa deserunt quibusdam nostrum accusamus
            enim vitae. Repellat sapiente libero iure quasi earum eaque aliquid
            nobis necessitatibus non rem accusamus ad esse ullam maxime
            blanditiis cupiditate ab harum praesentium, vel itaque voluptas sint
            quia? Minus soluta repellat nihil earum!
          </p>
          <button
            type="button"
            className="inscriptionBtn"
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
