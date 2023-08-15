import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { IataCode } from "../../services/IataCode";
import UserContext from "../../contexts/UserContext";
import FormContext from "../../contexts/FormContext";

const textInputStyle = {
  width: "75%",
  padding: "5px 10px",
  borderBottom: "1px solid #645979",
  outline: "none",
  borderRadius: "5px",
  fontSize: "1.25rem",
  lineHeight: "1.75rem",
  fontWeight: "bold",
};

function CarbonEmissionPlaneForm() {
  const navigate = useNavigate();

  const { userId, firstname } = useContext(UserContext);
  const { setFormUserValues } = useContext(FormContext);

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

    if (userId) {
      axios
        .post(`${import.meta.env.VITE_BACKEND_URL}/flights`, formTravel)
        .then(() => {
          navigate("/userprofil");
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      setFormUserValues(formTravel);
      navigate("/inscription");
    }
  };

  const calculAgain = (evt) => {
    evt.preventDefault();
    setshowResults(false);
  };

  return (
    <div>
      {showResults ? (
        <div className="mx-3">
          <div className="flex justify-center flex-col items-center">
            <h3 className="font-bold text-xl font-display mt-2 md:mt-8 drop-shadow-lg">
              {" "}
              Distance parcourue
            </h3>
            <h3 className="font-bold text-2xl text-[#274001] drop-shadow-lg">
              {resultDistance} km{" "}
            </h3>
          </div>
          <div className="flex justify-center flex-col items-center">
            <h3 className="font-bold text-xl  font-display mt-2 md:mt-8 drop-shadow-lg">
              {" "}
              Emission CO2 totale
            </h3>
            <h3 className="font-bold text-2xl text-[#274001] drop-shadow-lg">
              {resultCo2} kg
            </h3>
          </div>
          <div className="flex justify-center flex-col items-center">
            <h3 className="font-bold text-xl font-display mt-2 md:mt-8 drop-shadow-lg">
              {" "}
              Emission CO2 individuelle
            </h3>
            <h3 className="font-bold text-2xl mb-6 md:mb-0 text-[#274001] drop-shadow-lg">
              {resultCo2 / numbOfPassengers} kg
            </h3>
          </div>
          <p className="text-justify pl-5 pr-5 font-display ">
            Ton voyage entre {userInputDepartureAirport} et{" "}
            {userInputArrivalAirport} d'une distance de {resultDistance} km émet{" "}
            {resultCo2} kg de dioxyde de carbone. Tu participes à l'augmentation
            des températures de notre chère planète Terre. Nous espérons que tu
            pourras trouver un autre moyen de transport que l'avion pour te
            rendre à ta destination. En attendant, tu peux sauvegarder ce trajet
            ainsi que les prochains afin de les comparer et trouver le voyage
            qui te fera le moins culpabiliser.
          </p>
          <div className="flex justify-around">
            <button
              type="submit"
              className="rounded-full hover:text-white font-bold py-2 px-8 bg-[#6C8C26] w-40 mt-8 mb-3 md:mr-10"
              onClick={saveFlight}
            >
              Sauvegarder
            </button>
            <button
              type="submit"
              className="rounded-full hover:text-white font-bold py-2 px-8 bg-[#6C8C26] w-40 mt-8 mb-3 md:ml-10"
              onClick={calculAgain}
            >
              Calculer
            </button>
          </div>
        </div>
      ) : (
        <div className="mx-3">
          <div className="flex justify-center">
            <h2 className="text-[#274001] font-display font-bold w-full text-center text-2xl drop-shadow-lg">
              {firstname
                ? `${firstname}, calcule l'émission de CO2 de ton trajet en avion`
                : "Calcule l'émission de CO2 de ton trajet en avion"}
            </h2>
          </div>

          <form className="flex flex-col items-center pt-10 md:flex-row md:w-full md:mt-10">
            <div className="flex flex-col items-center w-60 mb-5 md:mr-10">
              <label
                htmlFor="departure-airport"
                className="font-bold font-display text-center text-xl mb-2"
              >
                Aéroport de départ
              </label>
              <input
                type="search"
                className="w-[75%] py-[5px] px-[10px] border-b-[1px] border-[#645979] outline-none rounded-md text-xl font-bold md:w-[100%]"
                value={userInputDepartureAirport}
                onChange={handleDeparture}
              />
            </div>

            {userInputDepartureAirport !== "" && showSuggestDeparture && (
              <div className="relative">
                <ul className="bg-white overflow-y-auto rounded-md -ml-[23vw] w-[46vw] -mt-5 max-h-40 grid gap-2 absolute z-10 md:scrollbar md:scrollbar-track-[#EEF279] md:scrollbar-thumb-[#274001] md:scrollbar-track-rounded-md md:w-[10vw] md:-ml-[11.6vw] md:mt-[2.3vh]  md:no-scrollbar">
                  {cityNameSuggest.map((city, index) => (
                    <li
                      role="presentation"
                      key={index}
                      className="hover:bg-[#6C8C26] text-lg pl-4 cursor-pointer"
                      onClick={() => handleCityClickedDisplayDeparture(city)}
                    >
                      <p className="citySuggested">{city}</p>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <div className="flex flex-col items-center w-60 mb-5 md:mr-3">
              <label
                htmlFor="arrival-airport"
                className="font-bold text-center font-display text-xl mb-2 mt-4 md:mt-0"
              >
                Aéroport d'arrivée{" "}
              </label>
              <input
                type="search"
                className="w-[75%] py-[5px] px-[10px] border-b-[1px] border-[#645979] outline-none rounded-md text-xl font-bold md:w-[100%]"
                value={userInputArrivalAirport}
                onChange={handleArrival}
              />
            </div>

            {userInputArrivalAirport !== "" && showSuggestArrival && (
              <ul className="bg-white overflow-y-auto rounded-md mt-[21.1vh] w-[46vw] max-h-40 grid gap-2 absolute z-10 md:scrollbar md:scrollbar-track-[#EEF279] md:scrollbar-thumb-[#274001] md:scrollbar-track-rounded-md md:w-[10vw] md:ml-[11.6vw] md:mt-[18vh] md:no-scrollbar">
                {cityNameSuggest.map((city, index) => (
                  <li
                    role="presentation"
                    key={index}
                    className="hover:bg-[#6C8C26] text-lg pl-4 cursor-pointer"
                    onClick={() => handleCityClickedDisplayArrival(city)}
                  >
                    <p className="citySuggested">{city}</p>
                  </li>
                ))}
              </ul>
            )}

            <div className="flex flex-col items-center w-60 md:mb-5">
              <label
                htmlFor="numb-passengers"
                className="font-bold text-center mb-2 font-display text-xl mt-4 md:mt-0"
              >
                Nombre de passagers
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
          </form>
          <div className="flex justify-around pt-10 md:pt-8 md:justify-center">
            <button
              type="button"
              className="rounded-full hover:text-white font-bold pt-3 pb-3 pl-6 pr-6 bg-[#274001d8] text-[#EEF279] w-28 md:w-32 md:mt-10 md:mr-10"
              onClick={() => navigate("/")}
            >
              Retour
            </button>
            <button
              type="button"
              className="rounded-full hover:text-white font-bold pt-3 pb-3 pl-6 pr-6 bg-[#274001d8] text-[#EEF279] w-28 md:w-32 md:mt-10"
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

export default CarbonEmissionPlaneForm;
