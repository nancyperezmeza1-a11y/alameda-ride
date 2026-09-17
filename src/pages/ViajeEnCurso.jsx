import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

import { db } from "../firebase/firebase";

import {
  ref,
  onValue
} from "firebase/database";

import {
  actualizarEstadoViaje
} from "../services/actualizarEstadoViaje";

function ViajeEnCurso() {
  const navigate = useNavigate();

  const [viajes, setViajes] =
    useState([]);

  useEffect(() => {

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
                    "Aceptado" ||
                  item.estado ===
                    "En Curso"
              );

          setViajes(
            lista
          );

        } else {

          setViajes([]);

        }

      }

    );

  }, []);

  const iniciarViaje =
    async (id) => {

      await actualizarEstadoViaje(
        id,
        "En Curso"
      );

    };

  const finalizarViaje =
  async (id) => {

    await actualizarEstadoViaje(
      id,
      "Finalizado"
    );

    navigate(
      "/historial"
    );

  };

  return (

    <div className="contenedor">

      <div className="card">

        <div className="logo">

          <h1>
            🚗 Mis Viajes
          </h1>

        </div>

        {viajes.length === 0 ? (

          <p>
            No existen viajes.
          </p>

        ) : (

          viajes.map(
            (viaje) => (

              <div
                key={viaje.id}
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
                  👤{" "}
                  {viaje.nombreResidente}
                  {" "}
                  {viaje.apellidoResidente}
                </p>

                <p>
                  📞{" "}
                  {viaje.telefonoResidente}
                </p>

                <p>
                  📍{" "}
                  {viaje.origen}
                </p>

                <p>
                  🎯{" "}
                  {viaje.destino}
                </p>

                <p>
                  📌 Estado:
                  {" "}
                  {viaje.estado}
                </p>

                <br />

                {viaje.estado ===
                  "Aceptado" && (

                  <button
                    className="boton"
                    onClick={() =>
                      iniciarViaje(
                        viaje.id
                      )
                    }
                  >
                    ▶ Iniciar Viaje
                  </button>

                )}

                {viaje.estado ===
                  "En Curso" && (

                  <button
                    className="boton"
                    onClick={() =>
                      finalizarViaje(
                        viaje.id
                      )
                    }
                  >
                    ✅ Finalizar Viaje
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

export default ViajeEnCurso;