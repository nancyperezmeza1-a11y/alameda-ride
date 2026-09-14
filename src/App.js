import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import RutaProtegida from "./components/RutaProtegida";

import Inicio from "./pages/Inicio";
import Login from "./pages/Login";
import Registro from "./pages/Registro";
import RegistroConductor from "./pages/RegistroConductor";

import Dashboard from "./pages/Dashboard";

import Administracion from "./pages/Administracion";
import VerConductores from "./pages/VerConductores";
import GestionSolicitudes from "./pages/GestionSolicitudes";

import Solicitud from "./pages/Solicitud";
import Conductores from "./pages/Conductores";
import MisSolicitudes from "./pages/MisSolicitudes";

import ViajeEnCurso from "./pages/ViajeEnCurso";
import HistorialViajes from "./pages/HistorialViajes";

import Perfil from "./pages/Perfil";
import Sugerencias from "./pages/Sugerencias";

function App() {
  return (
    <BrowserRouter>

      <Navbar />

      <Routes>

        {/* Públicas */}

        <Route
          path="/"
          element={<Inicio />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/registro"
          element={<Registro />}
        />

        {/* Administración temporal */}

        <Route
          path="/registro-conductor"
          element={<RegistroConductor />}
        />

        <Route
          path="/ver-conductores"
          element={<VerConductores />}
        />

        <Route
          path="/administracion"
          element={<Administracion />}
        />

        <Route
          path="/gestion-solicitudes"
          element={<GestionSolicitudes />}
        />

        {/* Dashboard */}

        <Route
          path="/dashboard"
          element={
            <RutaProtegida>
              <Dashboard />
            </RutaProtegida>
          }
        />

        {/* Transporte */}

        <Route
          path="/solicitud"
          element={
            <RutaProtegida>
              <Solicitud />
            </RutaProtegida>
          }
        />

        <Route
          path="/conductores"
          element={
            <RutaProtegida>
              <Conductores />
            </RutaProtegida>
          }
        />

        <Route
          path="/mis-solicitudes"
          element={
            <RutaProtegida>
              <MisSolicitudes />
            </RutaProtegida>
          }
        />

        <Route
          path="/viaje-en-curso"
          element={
            <RutaProtegida>
              <ViajeEnCurso />
            </RutaProtegida>
          }
        />

        <Route
          path="/historial"
          element={
            <RutaProtegida>
              <HistorialViajes />
            </RutaProtegida>
          }
        />

        {/* Usuario */}

        <Route
          path="/perfil"
          element={
            <RutaProtegida>
              <Perfil />
            </RutaProtegida>
          }
        />

        <Route
          path="/sugerencias"
          element={
            <RutaProtegida>
              <Sugerencias />
            </RutaProtegida>
          }
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;