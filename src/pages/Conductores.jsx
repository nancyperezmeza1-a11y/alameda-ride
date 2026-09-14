import { useEffect, useState } from "react";
import "../App.css";

import { auth, db } from "../firebase/firebase";

import {
  ref,
  onValue
} from "firebase/database";

import {
  asignarConductor
} from "../services/asignarConductor";

import {
  obtenerConductorPorCorreo
} from "../services/obtenerConductorPorCorreo";

function Conductores() {

  const [solicitudes, setSolicitudes] =
    useState([]);

  const [conductor, setConductor] =
    useState(null);

  useEffect(() => {

    cargarConductor();

    const solicitudesRef =
      ref(
        db,
        "solicitudes"
      );

    onValue(
      solicitudesRef,
      (snapshot) => {

        const data =
          snapshot.val();

        if (data) {

          const lista =
            Object.keys(data)

              .map(
                (key) => ({
                  id: key,
                  ...data[key]
                })
              )

              .filter(
                (item) =>
                  item.estado ===
                  "Pendiente"
              );

          setSolicitudes(
            lista
          );

        } else {

          setSolicitudes([]);

        }

      }
    );

  }, []);

  const cargarConductor =
    async () => {

      try {

        const usuario =
          auth.currentUser;

        if (!usuario) return;

        const datos =
          await obtenerConductorPorCorreo(
            usuario.email
          );

        setConductor(
          datos
        );

      } catch (error) {

        console.log(error);

      }

    };

  const aceptarViaje =
    async (idSolicitud) => {

      try {

        await asignarConductor(
          idSolicitud,
          conductor
        );

      } catch (error) {

        console.log(error);

        alert(
          "Error al aceptar viaje"
        );

      }

    };

  return (

    <div className="contenedor">

      <div className="card">

        <div className="logo">

          <h1>
            🚘 Solicitudes Disponibles
          </h1>

          <p>
            Viajes pendientes por aceptar
          </p>

        </div>

        {solicitudes.length === 0 ? (

          <p>
            No existen solicitudes pendientes.
          </p>

        ) : (

          solicitudes.map(
            (solicitud) => (

              <div
                key={solicitud.id}
                style={{
                  border:
                    "1px solid #ccc",
                  borderRadius:
                    "10px",
                  padding:
                    "15px",
                  marginBottom:
                    "15px"
                }}
              >

                <p>
                  👤 <strong>Residente:</strong>{" "}
                  {solicitud.nombreResidente}
                  {" "}
                  {solicitud.apellidoResidente}
                </p>

                <p>
                  📞 <strong>Teléfono:</strong>{" "}
                  {solicitud.telefonoResidente}
                </p>

                <p>
                  📍 <strong>Origen:</strong>{" "}
                  {solicitud.origen}
                </p>

                <p>
                  🎯 <strong>Destino:</strong>{" "}
                  {solicitud.destino}
                </p>

                <p>
                  👥 <strong>Acompañantes:</strong>{" "}
                  {solicitud.acompanantes}
                </p>

                <p>
                  🧳 <strong>Equipaje:</strong>{" "}
                  {solicitud.equipaje}
                </p>

                <p>
                  📝 <strong>Observaciones:</strong>{" "}
                  {
                    solicitud.observaciones ||
                    "Sin observaciones"
                  }
                </p>

                <p>
                  📌 <strong>Estado:</strong>{" "}
                  {solicitud.estado}
                </p>

                <br />

                <button
                  className="boton"
                  onClick={() =>
                    aceptarViaje(
                      solicitud.id
                    )
                  }
                >
                  ✅ Aceptar Viaje
                </button>

              </div>

            )
          )

        )}

      </div>

    </div>

  );

}

export default Conductores;