import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Select from "react-select";
import UserContext from "../../contexts/UserContext";
import FormContext from "../../contexts/FormContext";

function CarbonEmissionCarForm() {
  const { userId, firstname } = useContext(UserContext);
  const { setFormUserValues } = useContext(FormContext);
  const navigate = useNavigate();

  const apiCarbonKey = "Ep1z5WxRJGFHfQ0u3mBg";
  const apiMapQuestKey = "GNatHF29OEMPNxYnsbSIYjNXyBA0ajHl";

  const [suggestBrandCar, setSuggestBrandCar] = useState([]);
  const [brandCar, setBrandCar] = useState("");
  const [brandId, setBrandId] = useState("");
  const [vehicleId, setVehicleId] = useState("");
  const [modelCar, setModelCar] = useState("");
  const [suggestModel, setSuggestModel] = useState([]);
  const [displayModelInput, setDisplayModelInput] = useState(false);

  const [formToFindDistance, setFormToFindDistance] = useState({
    from: "",
    to: "",
  });

  const handleChangeToFindDistance = (e) => {
    e.preventDefault();
    setFormToFindDistance({
      ...formToFindDistance,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    const getBrandList = async () => {
      try {
        const response = await axios.get(
          `https://www.carboninterface.com/api/v1/vehicle_makes`,
          {
            headers: {
              Authorization: `Bearer ${apiCarbonKey}`,
            },
          }
        );

        if (response.data && response.data.length > 0) {
          const brandNames = response.data.map(
            (item) => item.data.attributes.name
          );
          setSuggestBrandCar(brandNames);
        }
      } catch (error) {
        console.error("Erreur lors de la requête GET :", error);
      }
    };

    getBrandList();
  }, []);

  const identifyCarModel = async () => {
    try {
      const response = await axios.get(
        `https://www.carboninterface.com/api/v1/vehicle_makes/${brandId}/vehicle_models`,
        {
          headers: {
            Authorization: `Bearer ${apiCarbonKey}`,
          },
        }
      );

      if (response.data && response.data.length > 0) {
        const uniqueModels = [];
        const seenModelNames = new Set(); // pour garder une trace des modèles déjà rencontrés

        response.data.forEach((item) => {
          const modelName = item.data.attributes.name;
          const modelYear = item.data.attributes.year;
          const modelData = `${modelName} ${modelYear}`; // Crée une clé unique en combinant le nom et l'année
          if (!seenModelNames.has(modelData)) {
            // si seenModelNames n'a pas déjà le model name en cours
            seenModelNames.add(modelData); // ajoute le
            uniqueModels.push({
              // et ajoute le dans le tableau unique model
              name: modelName,
              years: Array.isArray(item.data.attributes.year)
                ? item.data.attributes.year
                : [item.data.attributes.year], // verifions que (item.data.attributes.year) est déjà un tableau ou non car on veut stocker un tableau
            });
          }
        });

        setSuggestModel(uniqueModels);
      }
    } catch (error) {
      console.error("Erreur lors de la requête GET :", error);
    }
  };

  useEffect(() => {
    if (brandCar) {
      const chooseBrand = async () => {
        try {
          const response = await axios.get(
            "https://www.carboninterface.com/api/v1/vehicle_makes",
            {
              headers: {
                Authorization: `Bearer ${apiCarbonKey}`,
              },
            }
          );
          if (response.data && response.data.length > 0) {
            const vehicle = response.data.find(
              (item) => item.data.attributes.name === brandCar
            );

            if (vehicle) {
              const newBrandId = vehicle.data.id;
              setBrandId(newBrandId);
              setDisplayModelInput(true);
            }
          }
        } catch (error) {
          console.error("Erreur lors de la requête GET :", error);
        }
      };

      chooseBrand();
    }
  }, [brandCar]);

  useEffect(() => {
    if (brandId && displayModelInput) {
      identifyCarModel();
    }
  }, [brandId, displayModelInput]);

  useEffect(() => {
    if (modelCar) {
      const [modelName, modelYear] = modelCar.split("_"); // Sépare le nom et l'année
      axios
        .get(
          `https:///www.carboninterface.com/api/v1/vehicle_makes/${brandId}/vehicle_models`,
          {
            headers: {
              Authorization: `Bearer ${apiCarbonKey}`,
            },
          }
        )
        .then((response) => {
          if (response.data && response.data.length > 0) {
            const matchCar = response.data.find(
              (item) =>
                item.data.attributes.name === modelName &&
                item.data.attributes.year === parseInt(modelYear, 10) // Convertit modelYear en nombre
            );
            if (matchCar) {
              setVehicleId(matchCar.data.id);
            }
          }
        });
    }
  }, [modelCar]);

  const estimateCarsCO2 = (distanceValue) => {
    fetch("https://www.carboninterface.com/api/v1/estimates", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiCarbonKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type: "vehicle",
        distance_unit: "km",
        distance_value: distanceValue,
        vehicle_model_id: vehicleId,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setFormUserValues(data); // dans le cas où user pas login

        axios
          .post(`${import.meta.env.VITE_BACKEND_URL}/cars`, {
            departure: formToFindDistance.from,
            arrival: formToFindDistance.to,
            carBrand: brandCar,
            carModel: modelCar,
            totalKgEmission: data.data.attributes.carbon_kg,
            kmDistance: distanceValue,
            user_iduser: userId,
          })
          .catch((err) => {
            console.error(err);
          });
      })
      .catch((error) => console.error(error));
  };

  const handleClickCalcul = async (event) => {
    event.preventDefault();

    const url = `http://www.mapquestapi.com/directions/v2/route?key=${apiMapQuestKey}&from=${formToFindDistance.from}&to=${formToFindDistance.to}&routeType=fastest&unit=k`;

    try {
      const response = await axios.get(url);
      const responseKmDistance = response.data.route.distance;
      estimateCarsCO2(responseKmDistance);
    } catch (err) {
      console.error(err);
    }

    navigate("/userprofil");
  };

  return (
    <div className="mx-3">
      <div className="flex justify-center">
        <h2 className="text-[#274001] font-display font-bold w-full text-center text-2xl drop-shadow-lg">
          {firstname
            ? `${firstname}, calcule l'émission de CO2 de ton trajet en voiture`
            : "Calcule l'émission de CO2 de ton trajet en voiture"}
        </h2>
      </div>

      <form className="flex flex-col items-center pt-10 md:flex-row md:w-full md:mt-10">
        <div className="flex flex-col items-center w-60 mb-3 md:mr-10 md:mb-5">
          <label
            htmlFor="departure-airport"
            className="font-bold  font-display text-center text-xl mb-2"
          >
            Ville de départ
          </label>
          <input
            type="search"
            className="w-[75%] py-[5px] px-[10px] border-b-[1px] border-[#645979] outline-none rounded-md text-xl font-bold md:w-[100%]"
            name="from"
            value={formToFindDistance.from}
            onChange={handleChangeToFindDistance}
            required
          />
        </div>

        <div className="flex flex-col items-center w-60 mb-3 md:mr-10 md:mb-5">
          <label
            htmlFor="arrival-airport"
            className="font-bold text-center font-display text-xl mt-2 mb-2 md:mt-0"
          >
            Ville d'arrivée
          </label>
          <input
            type="search"
            className="w-[75%] py-[5px] px-[10px] border-b-[1px] border-[#645979] outline-none rounded-md text-xl font-bold md:w-[100%]"
            name="to"
            value={formToFindDistance.to}
            onChange={handleChangeToFindDistance}
            required
          />
        </div>

        <div className="flex flex-col items-center w-60 mb-3 md:mb-5">
          <label
            htmlFor="brandCar"
            className="font-bold text-center mb-2 font-display text-xl mt-2 md:mt-0 md:mr-10"
          >
            Marque de la voiture
          </label>
          <div className="relative h-10 w-48 md:mr-10">
            <Select
              id="brandCar"
              className="w-full"
              options={suggestBrandCar
                .slice()
                .sort()
                .map((brand) => ({
                  label: brand,
                  value: brand,
                }))}
              theme={(theme) => ({
                ...theme,
                borderRadius: "6px",
                colors: {
                  ...theme.colors,
                  primary25: "#6C8C26",
                  primary: "#274001",
                },
              })}
              onChange={(selectedOption) => setBrandCar(selectedOption.value)}
              isSearchable={false}
            />
          </div>
        </div>

        {displayModelInput && (
          <div className="flex flex-col items-center w-60 md:mb-5">
            <label
              htmlFor="modelCar"
              className="font-bold text-center mb-2 font-display text-xl mt-2 md:mt-0"
            >
              Modèle de la voiture
            </label>
            <div className="relative w-48">
              <Select
                id="modelCar"
                className="w-full"
                options={suggestModel
                  .slice()
                  .sort((a, b) => a.name.localeCompare(b.name))
                  .map((modelData) => ({
                    label: `${modelData.name} (${modelData.years.join(", ")})`,
                    value: `${modelData.name}_${modelData.years[0]}`,
                  }))}
                theme={(theme) => ({
                  ...theme,
                  borderRadius: "6px",
                  colors: {
                    ...theme.colors,
                    primary25: "#6C8C26",
                    primary: "#274001",
                  },
                })}
                onChange={(selectedOption) => setModelCar(selectedOption.value)}
              />
            </div>
          </div>
        )}
      </form>
      {displayModelInput ? (
        <div className="flex justify-around pt-2 md:pt-[31px] md:justify-center">
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
            onClick={handleClickCalcul}
          >
            Calculer
          </button>
        </div>
      ) : (
        <div className="flex justify-around pt-10 md:pt-[31px] md:justify-center">
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
            onClick={handleClickCalcul}
          >
            Calculer
          </button>
        </div>
      )}
    </div>
  );
}

export default CarbonEmissionCarForm;
