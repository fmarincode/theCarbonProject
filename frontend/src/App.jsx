import { Route, Routes } from "react-router-dom";
import FlightFormPage from "./pages/FlightFormPage";
import "./index.css";
import { UserProvider } from "./contexts/UserContext";
import { FormProvider } from "./contexts/FormContext";
import HomePage from "./pages/HomePage";
import InscriptionPage from "./pages/InscriptionPage";
import UserProfil from "./pages/UserProfil";
import background from "./assets/kazuend-19SC2oaVZW0-unsplash.jpg";
import Navbar from "./Components/Navbar/Navbar";
import LoginPage from "./pages/LoginPage";
import CarFormPage from "./pages/CarFormPage";
import ChooseJourneyPage from "./pages/ChooseJourneyPage";

function App() {
  return (
    <div
      className="bg-cover bg-center h-screen "
      style={{ backgroundImage: `url(${background})` }}
    >
      <UserProvider>
        <FormProvider>
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/choose" element={<ChooseJourneyPage />} />
            <Route path="/FlightFormPage" element={<FlightFormPage />} />
            <Route path="/CarFormPage" element={<CarFormPage />} />
            <Route path="/inscription" element={<InscriptionPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/profil" element={<UserProfil />} />
          </Routes>
        </FormProvider>
      </UserProvider>
    </div>
  );
}

export default App;
