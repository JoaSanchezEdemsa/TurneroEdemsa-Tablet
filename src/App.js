import React from "react";
import { Routes, Route } from "react-router-dom"; // Importar Routes y Route
import SetDNI from "./functions/SetDNI";
import SetNombre from "./functions/SetNombre";

function App() {
  return (
    <Routes>
      <Route path="/" element={<SetDNI />} />
      <Route path="/paso2" element={<SetNombre />} />
    </Routes>
  );
}

export default App;
