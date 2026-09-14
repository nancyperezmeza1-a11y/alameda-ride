import { useEffect, useState } from "react";
import "../App.css";

import { db } from "../firebase/firebase";

import {
  ref,
  onValue,
  remove
} from "firebase/database";

function GestionSolicitudes() {

  const [solicitudes, setSolicitudes] =
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

  const eliminarSolicitud =
    async (id) => {

      const confirmar =
        window.confirm(
          "¿Desea eliminar esta solicitud?"
        );

      if (!confirmar) return;

      try {

        await remove(
          ref(
            db,
            `solicitudes/${id}`
          )
        );

        alert(
          "Solicitud eliminada correctamente"
        );

      } catch (error) {

        console.log(error);

        alert(
          "Error al eliminar solicitud"
        );

      }

    };

  return (

    <div className="contenedor">

      <div className="card">

        <div className="logo">

          <h1>
            📋 Gestión de Solicitudes
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
                  👤 {solicitud.nombreResidente}
                  {" "}
                  {solicitud.apellidoResidente}
                </p>

                <p>
                  📍 {solicitud.origen}
                </p>

                <p>
                  🎯 {solicitud.destino}
                </p>

                <p>
                  📌 Estado:
                  {" "}
                  {solicitud.estado}
                </p>

                <br />

                <button
                  className="boton"
                  style={{
                    background:
                      "#e74c3c"
                  }}
                  onClick={() =>
                    eliminarSolicitud(
                      solicitud.id
                    )
                  }
                >
                  🗑 Eliminar Solicitud
                </button>

              </div>

            )
          )

        )}

      </div>

    </div>

  );

}

export default GestionSolicitudes;