import React, { useState } from "react";
import { IataCode } from "../../Services/IataCode";
import "../../styles/CarbonEmissionForm.css";

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
    <div className="carbonEmissionFormContainer">
      <h2>Calculateur d'émissions de carbone pour voyage en avion</h2>

      <form className="formCalculator">
        <label htmlFor="departure-airport" className="labelDeparture">
          Aéroport de départ:
        </label>
        <input
          type="text"
          value={userInputDepartureAirport}
          onChange={handleDeparture}
        />

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

        <label htmlFor="arrival-airport" className="labelArrival">
          Aéroport d'arrivée:{" "}
        </label>
        <input
          type="text"
          value={userInputArrivalAirport}
          onChange={handleArrival}
        />

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

        <label htmlFor="numb-passengers">Nombre de passagers: </label>
        <input
          type="number"
          value={numbOfPassengers}
          min="1"
          max="1000"
          onChange={handleNumbOfPassengers}
        />
        <br />
        <br />

        <button type="button" onClick={calculateCarbonEmission}>
          Calculer
        </button>

        {showResults && (
          <>
            <p>
              Distance parcourue entre {userInputDepartureAirport} et{" "}
              {userInputArrivalAirport} : {resultDistance} km
            </p>
            <p>Emission CO2 : {resultCo2} kg</p>

            <b>{usingApi} / 200 monthly API usage.</b>
          </>
        )}
      </form>
    </div>
  );
}

export default CarbonEmissionForm;
