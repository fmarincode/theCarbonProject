import React, { useState } from "react";
import { IataCode } from "../../services/IataCode";
import "./CarbonEmissionForm.css";

const textInputStyle = {
  width: "75%",
  padding: "5px 10px",
  border: "none",
  borderBottom: "1px solid #645979",
  outline: "none",
  borderRadius: "5px",
  fontSize: "1rem",
};

function CarbonEmissionForm() {
  const [userInputDepartureAirport, setUserInputDepartureAirport] =
    useState(""); // input value
  const [userInputArrivalAirport, setUserInputArrivalAirport] = useState(""); // input value
  const [departureAirport, setDepartureAirport] = useState(""); // input value use to calcul, city departure
  const [arrivalAirport, setArrivalAirport] = useState(""); // input value use to calcul, city arrival
  const [numbOfPassengers, setNumbOfPassengers] = useState(""); // input value use to calcul, nb of passengers
  const [showResults, setshowResults] = useState(false); // display or not the result
  const [resultCo2, setResultCo2] = useState(""); // result of carbon emission in kg
  const [resultDistance, setResultDistance] = useState(""); // result of distance between the cities in km
  const [cityNameSuggest, setCityNameSuggest] = useState([]); // array with suggestion of city depends of input value
  const [usingApi, setUsingApi] = useState(1); // counter API calls
  const [showSuggestDeparture, setShowSuggestDeparture] = useState(true); // show input suggest for departure
  const [showSuggestArrival, setShowSuggestArrival] = useState(true); // show input suggest for arrival

  /* catching value to suggest values from array */

  const catchValue = (event, isDeparture) => {
    const inputToLower = event.target.value.toLowerCase();

    const newTab = [];

    for (let i = 0; i < IataCode.length; i++) {
      const object = IataCode[i];
      const keys = Object.keys(object);
      const valueObject = object[keys[0]].toLowerCase();

      if (isDeparture) {
        // check if its departure input

        if (valueObject.startsWith(inputToLower)) {
          newTab.push(valueObject);
        }
      } else {
        // if its arrival input & we delete the departure city of the list
        if (
          valueObject.startsWith(inputToLower) &&
          valueObject !== userInputDepartureAirport.toLowerCase()
        ) {
          newTab.push(valueObject);
        }
      }
    }

    setCityNameSuggest(newTab);
    // console.log(cityNameSuggest)
  };

  /* transform the value of input to IATA Code, necessary for using datas API */
  const findKeyMatchCity = (valeur) => {
    for (let i = 0; i < IataCode.length; i++) {
      const object = IataCode[i];
      const keys = Object.keys(object);
      const valueObject = object[keys[0]].toLowerCase();

      if (valueObject === valeur) {
        return keys[0];
      }
    }

    return null; // if don't find value
  };

  /* set the input with city clicked & disabled the suggest city list */

  const handleCityClickedDisplayDeparture = (city) => {
    setUserInputDepartureAirport(city);
    setShowSuggestDeparture(false);
    const findKey = findKeyMatchCity(city.toLowerCase());
    setDepartureAirport(findKey);
  };

  const handleCityClickedDisplayArrival = (city) => {
    setUserInputArrivalAirport(city);
    setShowSuggestArrival(false);
    const findKey = findKeyMatchCity(city.toLowerCase());
    setArrivalAirport(findKey);
  };

  /* Calcul the co2 emissions Part */

  /* take nb of passengers & call the api to calcul */

  const handleNumbOfPassengers = (event) => {
    setNumbOfPassengers(event.target.value);
  };

  /* get value input & manage it to keep user value -- for departure */

  const handleDepartureAirportChange = (event) => {
    setShowSuggestDeparture(true);
    const userInput = event.target.value;
    setUserInputDepartureAirport(userInput);
    const findKey = findKeyMatchCity(userInput.toLowerCase());
    setDepartureAirport(findKey);
  };

  const handleDeparture = (event) => {
    setShowSuggestDeparture(true);
    handleDepartureAirportChange(event);
    catchValue(event, true);
  };

  /* get value input & manage it to keep user value -- for arrival */

  const handleArrivalAirportChange = (event) => {
    const userInput = event.target.value;
    setUserInputArrivalAirport(userInput);
    const findKey = findKeyMatchCity(userInput.toLowerCase());
    setArrivalAirport(findKey);
  };

  const handleArrival = (event) => {
    setShowSuggestArrival(true);
    handleArrivalAirportChange(event);
    catchValue(event, false);
  };

  /* calling the API to estimate the result of flight */

  const calculateCarbonEmission = (event) => {
    event.preventDefault();
    const apiKey = "Ep1z5WxRJGFHfQ0u3mBg";

    fetch("https://www.carboninterface.com/api/v1/estimates", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type: "flight",
        passengers: numbOfPassengers,
        legs: [
          {
            departure_airport: departureAirport,
            destination_airport: arrivalAirport,
          },
        ],
        distance_unit: "km",
      }),
    })
      .then((response) => response.json())
      .then((dataResult) => {
        // console.log("Carbon Emission Estimate:", dataResult.data);
        // console.log(departureAirport);
        // console.log(arrivalAirport);
        setResultCo2(dataResult.data.attributes.carbon_kg);
        setResultDistance(dataResult.data.attributes.distance_value);
        setUsingApi(usingApi + 1);
        setshowResults(true);
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="min-w-[65%] max-w-[65%] min-h-[50vh] bg-[#BEBF93] flex flex-col mx-auto my-auto rounded-lg">
        <h2 className="text-[#D96E30] flex items-center font-bold justify-center text-3xl mb-10 mt-5 ">
          [Prénom] Calcul l'emission de co2 de ton trajet en avion
        </h2>

        <form className="flex flex-row justify-center mt-6">
          <div className="flex flex-col items-center">
            <label
              htmlFor="departure-airport"
              className="font-bold text-center mb-2"
            >
              Aéroport de départ
            </label>
            <input
              type="search"
              style={textInputStyle}
              value={userInputDepartureAirport}
              onChange={handleDeparture}
            />
          </div>

          {userInputDepartureAirport !== "" && showSuggestDeparture && (
            <ul className="displaySuggestDeparture">
              {cityNameSuggest.map((city, index) => (
                <li
                  role="presentation"
                  key={city[index]}
                  className="customListItem"
                  onClick={() => handleCityClickedDisplayDeparture(city)}
                >
                  <p className="citySuggested">{city}</p>
                </li>
              ))}
            </ul>
          )}
          <div className="flex flex-col items-center">
            <label
              htmlFor="arrival-airport"
              className="font-bold text-center mb-2"
            >
              Aéroport d'arrivée{" "}
            </label>
            <input
              type="search"
              style={textInputStyle}
              value={userInputArrivalAirport}
              onChange={handleArrival}
            />
          </div>

          {userInputArrivalAirport !== "" && showSuggestArrival && (
            <ul className="displaySuggestArrival">
              {cityNameSuggest.map((city, index) => (
                <li
                  role="presentation"
                  key={city[index]}
                  className="customListItem"
                  onClick={() => handleCityClickedDisplayArrival(city)}
                >
                  <p className="citySuggested">{city}</p>
                </li>
              ))}
            </ul>
          )}

          <br />
          <br />
          <div className="flex flex-col items-center">
            <label
              htmlFor="numb-passengers"
              className="font-bold text-center mb-2"
            >
              Nombre de passagers{" "}
            </label>
            <input
              type="number"
              style={textInputStyle}
              value={numbOfPassengers}
              min="1"
              max="1000"
              onChange={handleNumbOfPassengers}
            />
          </div>
          <br />
          <br />
        </form>
        <div className="flex justify-center">
          <button
            type="button"
            className="rounded-full font-bold pt-4 pb-4 pl-8 pr-8 bg-[#D96E30] w-32 mt-11"
            onClick={calculateCarbonEmission}
          >
            Calculer
          </button>
        </div>

        {showResults && (
          <div className="flex flex-col mt-8 justify-around">
            <div className="flex justify-around">
              <h3 className="font-bold text-4xl"> {resultDistance} km </h3>
              <h3 className="font-bold text-4xl"> {resultCo2} kg</h3>
              <h3 className="font-bold text-4xl">
                {resultCo2 / numbOfPassengers} kg
              </h3>
            </div>
            <div className="flex justify-around">
              <h3 className="font-bold text-xl mt-8"> Distance parcourue</h3>
              <h3 className="font-bold text-xl mt-8 relative left-10">
                {" "}
                Emission CO2 totale
              </h3>
              <h3 className="font-bold text-xl mt-8 relative left-5">
                {" "}
                Emission CO2 individuelle
              </h3>
            </div>
            <p className="text-justify mt-8 pl-5 pr-5">
              Ton voyage entre {userInputDepartureAirport} et{" "}
              {userInputArrivalAirport} d'une distance de {resultDistance} km
              émet {resultCo2} kg de dioxyde de carbone. Tu participes
              activement à l'augmentation des températures de notre chère
              planète Terre. Nous espérons que tu pourras trouver un autre moyen
              de transport que l'avion pour te rendre à ta destination. En
              attendant, tu peux sauvegarder ce trajet ainsi que les prochains
              afin de les comparer et trouver le voyage qui te fera le moins
              culpabiliser.
            </p>
            <div className="flex justify-center">
              <button
                type="submit"
                className="rounded-full font-bold pt-4 pb-4 pl-8 pr-8 bg-[#D96E30] w-40 mt-8 mb-8"
              >
                Sauvegarder
              </button>
            </div>
            {/* <b>{usingApi} / 200 monthly API usage.</b> */}
          </div>
        )}
      </div>
    </div>
  );
}

export default CarbonEmissionForm;
