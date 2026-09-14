import { useEffect, useState } from "react";
import "../App.css";

import { db } from "../firebase/firebase";

import {
  ref,
  onValue
} from "firebase/database";

import {
  cambiarEstadoConductor
} from "../services/cambiarEstadoConductor";

function VerConductores() {

  const [conductores, setConductores] =
    useState([]);

  useEffect(() => {

    const conductoresRef =
      ref(
        db,
        "conductores"
      );

    onValue(
      conductoresRef,
      (snapshot) => {

        const data =
          snapshot.val();

        if (data) {

          const lista =
            Object.keys(data).map(
              (key) => ({

                id: key,

                ...data[key]

              })
            );

          setConductores(
            lista
          );

        } else {

          setConductores([]);

        }

      }
    );

  }, []);

  return (

    <div className="contenedor">

      <div className="card">

        <div className="logo">

          <h1>
            🚗 Conductores
          </h1>

        </div>

        {conductores.length === 0 ? (

          <p>
            No existen conductores registrados.
          </p>

        ) : (

          conductores.map(
            (conductor) => (

              <div
                key={conductor.id}
                style={{
                  border:
                    "1px solid #cccccc",
                  padding:
                    "15px",
                  borderRadius:
                    "10px",
                  marginBottom:
                    "15px"
                }}
              >

                <p>
                  👤 <strong>Nombre:</strong>{" "}
                  {conductor.nombre}
                  {" "}
                  {conductor.apellido}
                </p>

                <p>
                  📞 <strong>Teléfono:</strong>{" "}
                  {conductor.telefono}
                </p>

                <p>
                  🚗 <strong>Placa:</strong>{" "}
                  {conductor.placa}
                </p>

                <p>
                  🎨 <strong>Color:</strong>{" "}
                  {conductor.color}
                </p>

                <p>
                  📧 <strong>Correo:</strong>{" "}
                  {conductor.correo}
                </p>

                <p>

                  {conductor.activo !== false ? (

                    <span
                      style={{
                        color: "green",
                        fontWeight: "bold"
                      }}
                    >
                      ✅ Activo
                    </span>

                  ) : (

                    <span
                      style={{
                        color: "red",
                        fontWeight: "bold"
                      }}
                    >
                      🚫 Desactivado
                    </span>

                  )}

                </p>

                {conductor.activo !== false ? (

                  <button
                    className="boton"
                    style={{
                      background:
                        "#e74c3c"
                    }}
                    onClick={() =>
                      cambiarEstadoConductor(
                        conductor.id,
                        false
                      )
                    }
                  >
                    🚫 Desactivar
                  </button>

                ) : (

                  <button
                    className="boton"
                    style={{
                      background:
                        "#27ae60"
                    }}
                    onClick={() =>
                      cambiarEstadoConductor(
                        conductor.id,
                        true
                      )
                    }
                  >
                    ✅ Activar
                  </button>

                )}

              </div>

            )
          )

        )}

      </div>

    </div>

  );

}

export default VerConductores;