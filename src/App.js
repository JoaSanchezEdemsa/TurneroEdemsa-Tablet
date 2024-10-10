import React from "react";
import { Routes, Route } from "react-router-dom"; // Importar Routes y Route
import SetSucursalTablet from "./functions/SetSucursalTablet";
import SetDNI from "./functions/SetDNI";
import SetNombre from "./functions/SetNombre";
import SetMotivos from "./functions/SetMotivos";

function App() {
  return (
    <Routes>
      <Route path="/" element={<SetSucursalTablet />} />
      <Route path="/paso1" element={<SetDNI />} />
      <Route path="/paso2" element={<SetNombre />} />
      <Route path="/paso3" element={<SetMotivos />} />
    </Routes>
  );
}

export default App;
