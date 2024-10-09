import React from "react";
import { Routes, Route } from "react-router-dom"; // Importar Routes y Route
import SetDNI from "./SetDNI";
import SetNombre from "./SetNombre";

function App() {
  return (
    <Routes>
      <Route path="/" element={<SetDNI />} />
      <Route path="/paso2" element={<SetNombre />} />
    </Routes>
  );
}

export default App;
