import { useState, useMemo } from "react";
import { Route, Routes } from "react-router-dom";
import FlightFormPage from "./pages/FlightFormPage";
/* import Footer from "./Components/Footer/Footer"; */
/* import Navbar from "./Components/Navbar/Navbar";
 */
import "./index.css";

import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import { UserContext } from "./Contexts/UserContext";
import InscriptionPage from "./pages/InscriptionPage";
import UserProfil from "./pages/UserProfil";

function App() {
  const [user, setUser] = useState(null);

  // Utilise useMemo pour envelopper l'objet de valeur du contexte
  const userContextValue = useMemo(() => ({ user, setUser }), [user, setUser]);

  return (
    <div className="bg-[#6F7355]">
      <UserContext.Provider value={userContextValue}>
        {/* <Navbar /> */}

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/FlightFormPage" element={<FlightFormPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/inscription" element={<InscriptionPage />} />
          <Route path="/profil" element={<UserProfil />} />
        </Routes>
      </UserContext.Provider>

      {/* <Footer /> */}
    </div>
  );
}

export default App;
