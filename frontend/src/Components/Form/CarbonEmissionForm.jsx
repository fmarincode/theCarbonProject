import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { IataCode } from "../../services/IataCode";
import "./CarbonEmissionForm.css";
import UserContext from "../../contexts/UserContext";

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
  const navigate = useNavigate();

  const { userId, firstname } = useContext(UserContext);

  const [userInputDepartureAirport, setUserInputDepartureAirport] =
    useState(""); // input value
  const [userInputArrivalAirport, setUserInputArrivalAirport] = useState(""); // input value
  const [departureAirport, setDepartureAirport] = useState(""); // input value use to calcul, city departure
  const [arrivalAirport, setArrivalAirport] = useState(""); // input value use to calcul, city arrival
  const [numbOfPassengers, setNumbOfPassengers] = useState(""); // input value use to calcul, nb of passengers
  const [showResults, setshowResults] = useState(false); // display or not the result
  const [resultCo2, setResultCo2] = useState(); // result of carbon emission in kg
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

  /* Send DATA to database */

  const formTravel = {
    departure: userInputDepartureAirport,
    arrival: userInputArrivalAirport,
    passengers: numbOfPassengers,
    totalKgEmission: resultCo2,
    kmDistance: resultDistance,
    user_iduser: userId,
  };

  const saveFlight = (evt) => {
    evt.preventDefault();
    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/flights`, formTravel)
      .then(() => {
        navigate("/profil");
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const calculAgain = (evt) => {
    evt.preventDefault();
    setshowResults(false);
  };

  return (
    <div className="flex items-center justify-center h-screen ">
      {showResults ? (
        <div className="flex flex-col mt-6 bg-[#c4c589ba] min-w-[95%] max-w-[95%] md:min-w-[65%] md:max-w-[65%] rounded-md p-4 mx-2.5 space-y-0 md:space-y-0 md:flex-row md:justify-around">
          <div className="flex justify-center flex-col items-center">
            <h3 className="font-bold text-xl mt-2 md:mt-8">
              {" "}
              Distance parcourue
            </h3>
            <h3 className="font-bold text-2xl text-[#274001]">
              {Math.round(resultDistance)} km{" "}
            </h3>
          </div>
          <div className="flex justify-center flex-col items-center">
            <h3 className="font-bold text-xl mt-2 md:mt-8">
              {" "}
              Emission CO2 totale
            </h3>
            <h3 className="font-bold text-2xl text-[#274001]">
              {Math.round(resultCo2)} kg
            </h3>
          </div>
          <div className="flex justify-center flex-col items-center">
            <h3 className="font-bold text-xl mt-2 md:mt-8">
              {" "}
              Emission CO2 individuelle
            </h3>
            <h3 className="font-bold text-2xl mb-6 text-[#274001]">
              {Math.round(resultCo2 / numbOfPassengers)} kg
            </h3>
          </div>
          <p className="text-justify pl-5 pr-5">
            Ton voyage entre {userInputDepartureAirport} et{" "}
            {userInputArrivalAirport} d'une distance de {resultDistance} km émet{" "}
            {resultCo2} kg de dioxyde de carbone. Tu participes activement à
            l'augmentation des températures de notre chère planète Terre. Nous
            espérons que tu pourras trouver un autre moyen de transport que
            l'avion pour te rendre à ta destination. En attendant, tu peux
            sauvegarder ce trajet ainsi que les prochains afin de les comparer
            et trouver le voyage qui te fera le moins culpabiliser.
          </p>
          <div className="flex justify-around">
            <button
              type="submit"
              className="rounded-full font-bold py-2 px-8 bg-[#6C8C26] w-40 mt-8 mb-3"
              onClick={saveFlight}
            >
              Sauvegarder
            </button>
            <button
              type="submit"
              className="rounded-full font-bold py-2 px-8 bg-[#6C8C26] w-40 mt-8 mb-3"
              onClick={calculAgain}
            >
              Calculer
            </button>
          </div>
        </div>
      ) : (
        <div className="min-w-[95%] max-w-[95%] md:min-w-[65%] md:max-w-[65%] min-h-[72vh] bg-[#c4c589ba] flex flex-col items-center mx-3 my-auto rounded-lg">
          <h2 className="text-[#274001] flex items-center font-bold w-3/4 text-center justify-center text-2xl mb-5 mt-10">
            {firstname}, calcules l'émission de CO2 de ton trajet en avion
          </h2>

          <form className="flex flex-col mt-6">
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
                    key={index}
                    className="p-2 text-sm hover:bg-[#d96e30] hover:text-white overflow-y-auto"
                    onClick={() => handleCityClickedDisplayDeparture(city)}
                  >
                    <p className="citySuggested">{city}</p>
                  </li>
                ))}
              </ul>
            )}
            <div className="flex flex-col items-center mt-12">
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
              <ul className="list-none w-64 md:w-40 bg-white rounded-md shadow-lg z-10 overflow-y-auto max-h-36 md:max-h-24 absolute md:static bottom-28 md:bottom-auto left-0 md:left-31%">
                {cityNameSuggest.map((city, index) => (
                  <li
                    role="presentation"
                    key={index}
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
          <div className="flex justify-center mt-0">
            <button
              type="button"
              className="rounded-full font-bold pt-3 pb-3 pl-6 pr-6 bg-[#6C8C26] w-28 mt-5 mb-5 md:w-32 md:mt-10"
              onClick={calculateCarbonEmission}
            >
              Calculer
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CarbonEmissionForm;
