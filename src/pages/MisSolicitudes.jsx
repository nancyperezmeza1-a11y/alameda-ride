import { useEffect, useState } from "react";
import "../App.css";

import { db, auth } from "../firebase/firebase";

import {
  ref,
  onValue
} from "firebase/database";

import {
  cancelarSolicitud
} from "../services/cancelarSolicitud";

function MisSolicitudes() {

  const [solicitudes, setSolicitudes] =
    useState([]);

  useEffect(() => {

    const usuario =
      auth.currentUser;

    if (!usuario) return;

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
                  item.uid ===
                  usuario.uid
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

  const colorEstado = (estado) => {

    switch (estado) {

      case "Pendiente":
        return "#f39c12";

      case "Aceptado":
        return "#3498db";

      case "En Curso":
        return "#27ae60";

      case "Finalizado":
        return "#7f8c8d";

      case "Cancelado":
        return "#e74c3c";

      default:
        return "#000";

    }

  };

  return (

    <div className="contenedor">

      <div className="card">

        <div className="logo">

          <h1>
            📋 Mis Solicitudes
          </h1>

        </div>

        {solicitudes.length === 0 ? (

          <p>
            No existen solicitudes.
          </p>

        ) : (

          solicitudes.map(
            (solicitud) => (

              <div
                key={solicitud.id}
                style={{
                  border:
                    "1px solid #ccc",
                  padding:
                    "15px",
                  borderRadius:
                    "10px",
                  marginBottom:
                    "15px"
                }}
              >

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
                  {solicitud.observaciones ||
                    "Sin observaciones"}
                </p>

                <hr />

                <p
                  style={{
                    color:
                      colorEstado(
                        solicitud.estado
                      ),
                    fontWeight:
                      "bold"
                  }}
                >
                  📌 Estado:
                  {" "}
                  {solicitud.estado}
                </p>

                {solicitud.estado ===
                "Pendiente" && (

                  <>
                    <p>
                      ⏳ Esperando conductor.
                    </p>

                    <button
                      className="boton"
                      style={{
                        background:
                          "#e74c3c"
                      }}
                      onClick={() =>
                        cancelarSolicitud(
                          solicitud.id
                        )
                      }
                    >
                      ❌ Cancelar Solicitud
                    </button>
                  </>

                )}

                {solicitud.estado ===
                "Aceptado" && (

                  <>
                    <p>
                      ✅ Conductor asignado.
                    </p>

                    <p>
                      👤{" "}
                      {
                        solicitud.conductorNombre
                      }
                      {" "}
                      {
                        solicitud.conductorApellido
                      }
                    </p>

                    <p>
                      📞{" "}
                      {
                        solicitud.conductorTelefono
                      }
                    </p>

                    <p>
                      🚗{" "}
                      {
                        solicitud.conductorPlaca
                      }
                    </p>

                    <p>
                      🎨{" "}
                      {
                        solicitud.conductorColor
                      }
                    </p>
                  </>

                )}

                {solicitud.estado ===
                "En Curso" && (

                  <p>
                    🚗 El conductor va en camino.
                  </p>

                )}

                {solicitud.estado ===
                "Finalizado" && (

                  <p>
                    🏁 Viaje finalizado.
                  </p>

                )}

                {solicitud.estado ===
                "Cancelado" && (

                  <p>
                    ❌ Solicitud cancelada.
                  </p>

                )}

              </div>

            )
          )

        )}

      </div>

    </div>

  );

}

export default MisSolicitudes;