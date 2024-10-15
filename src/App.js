import React from "react";
import { Routes, Route } from "react-router-dom";
import SetSucursalTablet from "./functions/SetSucursalTablet";
import SetDNI from "./functions/SetDNI";
import SetNombre from "./functions/SetNombre";
import SetMotivos from "./functions/SetMotivos";
import TurnoRegistrado from "./functions/ConfirmacionTurno";

function App() {
  return (
    <Routes>
      <Route path="/" element={<SetSucursalTablet />} />
      <Route path="/paso1" element={<SetDNI />} />
      <Route path="/paso2" element={<SetNombre />} />
      <Route path="/paso3" element={<SetMotivos />} />
      <Route path="/turnolisto" element={<TurnoRegistrado />} />
    </Routes>
  );
}

export default App;
