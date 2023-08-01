import { Route, Routes } from "react-router-dom";
import FlightFormPage from "./pages/FlightFormPage";
/* import Footer from "./Components/Footer/Footer"; */

import "./index.css";
import { UserProvider } from "./contexts/UserContext";

import HomePage from "./pages/HomePage";
import InscriptionPage from "./pages/InscriptionPage";
import UserProfil from "./pages/UserProfil";
import background from "./assets/kazuend-19SC2oaVZW0-unsplash.jpg";
import Navbar from "./Components/Navbar/Navbar";

function App() {
  return (
    <div
      className="bg-cover bg-center h-screen "
      style={{ backgroundImage: `url(${background})` }}
    >
      <UserProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/FlightFormPage" element={<FlightFormPage />} />
          <Route path="/inscription" element={<InscriptionPage />} />
          <Route path="/profil" element={<UserProfil />} />
        </Routes>
      </UserProvider>
    </div>
  );
}

export default App;
