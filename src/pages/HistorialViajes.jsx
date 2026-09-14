import { useEffect, useState } from "react";
import "../App.css";

import { db } from "../firebase/firebase";

import {
  ref,
  onValue
} from "firebase/database";

function HistorialViajes() {

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
                  "Finalizado"
              );

          setViajes(lista);

        } else {

          setViajes([]);

        }

      }
    );

  }, []);

  return (

    <div className="contenedor">

      <div className="card">

        <div className="logo">

          <h1>
            📋 Historial de Viajes
          </h1>

        </div>

        {viajes.length === 0 ? (

          <p>
            No existen viajes finalizados.
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
                  👤 {viaje.nombreResidente}
                  {" "}
                  {viaje.apellidoResidente}
                </p>

                <p>
                  📍 {viaje.origen}
                </p>

                <p>
                  🎯 {viaje.destino}
                </p>

                <p>
                  🚗 {viaje.conductorPlaca}
                </p>

                <p>
                  📌 {viaje.estado}
                </p>

              </div>

            )
          )

        )}

      </div>

    </div>

  );

}

export default HistorialViajes;