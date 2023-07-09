import { useState, useMemo } from "react";
import { Route, Routes } from "react-router-dom";
import FlightFormPage from "./Pages/FlightFormPage";
import Footer from "./Components/Footer/Footer";
import Navbar from "./Components/Navbar/Navbar";
import "./App.css";

import LoginPage from "./Pages/LoginPage";
import Home from "./Pages/Home";
import { UserContext } from "./Contexts/UserContext";

function App() {
  const [user, setUser] = useState(null);

  // Utilise useMemo pour envelopper l'objet de valeur du contexte
  const userContextValue = useMemo(() => ({ user, setUser }), [user, setUser]);

  return (
    <div className="App">
      <UserContext.Provider value={userContextValue}>
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/FlightFormPage" element={<FlightFormPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </UserContext.Provider>

      <Footer />
    </div>
  );
}

export default App;
