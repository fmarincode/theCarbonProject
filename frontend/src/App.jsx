import { Route, Routes } from "react-router-dom";
import FlightFormPage from "./pages/FlightFormPage";
/* import Footer from "./Components/Footer/Footer"; */

import "./index.css";
import { UserProvider } from "./contexts/UserContext";

import HomePage from "./pages/HomePage";
import InscriptionPage from "./pages/InscriptionPage";
import UserProfil from "./pages/UserProfil";

function App() {
  return (
    <div className="bg-[#6F7355]">
      <UserProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/FlightFormPage" element={<FlightFormPage />} />
          <Route path="/inscription" element={<InscriptionPage />} />
          <Route path="/profil" element={<UserProfil />} />
        </Routes>
      </UserProvider>

      {/* <Footer /> */}
    </div>
  );
}

export default App;
