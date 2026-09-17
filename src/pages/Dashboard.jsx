import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import "../App.css";

import { auth, db } from "../firebase/firebase";

import {
  ref,
  get
} from "firebase/database";

function Dashboard() {

  const [tipoUsuario, setTipoUsuario] =
    useState("");

  const [nombre, setNombre] =
    useState("");

  useEffect(() => {

    cargarUsuario();

  }, []);

  const cargarUsuario =
    async () => {

      const usuario =
        auth.currentUser;

      if (!usuario) return;

      const correo =
        usuario.email;

      const residentesRef =
        ref(
          db,
          "residentes"
        );

      const conductoresRef =
        ref(
          db,
          "conductores"
        );

      const residentes =
        await get(
          residentesRef
        );

      const conductores =
        await get(
          conductoresRef
        );

      if (
        residentes.exists()
      ) {

        const data =
          residentes.val();

        Object.keys(data)
          .forEach(
            (key) => {

              if (
                data[key].correo ===
                correo
              ) {

                setTipoUsuario(
                  "Residente"
                );

                setNombre(
                  data[key].nombre
                );

              }

            }
          );

      }

      if (
        conductores.exists()
      ) {

        const data =
          conductores.val();

        Object.keys(data)
          .forEach(
            (key) => {

              if (
                data[key].correo ===
                correo
              ) {

                setTipoUsuario(
                  "Conductor"
                );

                setNombre(
                  data[key].nombre
                );

              }

            }
          );

      }

    };

  return (

    <div className="contenedor">

      <div className="card">

        <div className="logo">

          <h1>
            👋 Bienvenido
          </h1>

          <p>
            {nombre}
          </p>

          <br />

          <p>
            ¿Qué deseas hacer hoy?
          </p>

        </div>

        {tipoUsuario ===
          "Residente" && (

          <>

            <Link
              to="/solicitud"
            >
              <button
                className="boton"
              >
                🚗 Solicitar Transporte
              </button>
            </Link>

            <br />
            <br />

            <Link
              to="/mis-solicitudes"
            >
              <button
                className="boton"
              >
                📋 Mis Solicitudes
              </button>
            </Link>

            <br />
            <br />

            <Link
              to="/historial"
            >
              <button
                className="boton"
              >
                📚 Historial
              </button>
            </Link>

          </>

        )}

        {tipoUsuario ===
          "Conductor" && (

          <>

            <Link
              to="/conductores"
            >
              <button
                className="boton"
              >
                🚘 Solicitudes Disponibles
              </button>
            </Link>

            <br />
            <br />

            <Link
              to="/viaje-en-curso"
            >
              <button
                className="boton"
              >
                🚗 Mis Viajes
              </button>
            </Link>

            <br />
            <br />

            <Link
              to="/historial"
            >
              <button
                className="boton"
              >
                📚 Historial
              </button>
            </Link>

          </>

        )}

        <br />

        <Link
          to="/perfil"
        >
          <button
            className="boton"
          >
            👤 Mi Perfil
          </button>
        </Link>

        <br />
        <br />

        <Link
          to="/sugerencias"
        >
          <button
            className="boton"
          >
            💡 Sugerencias
          </button>
        </Link>

      </div>

    </div>

  );

}

export default Dashboard;