import { useEffect, useState } from "react";
import "../App.css";

import { db } from "../firebase/firebase";

import {
  ref,
  onValue
} from "firebase/database";

function ViajeEnCurso() {

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

  return (

    <div className="contenedor">

      <div className="card">

        <div className="logo">

          <h1>
            🚗 Viajes En Curso
          </h1>

        </div>

        {viajes.length === 0 ? (

          <p>
            No existen viajes en curso.
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
                  📞 {viaje.telefonoResidente}
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
                  🎨 {viaje.conductorColor}
                </p>

                <p>
                  📌 Estado:
                  {" "}
                  {viaje.estado}
                </p>

              </div>

            )
          )

        )}

      </div>

    </div>

  );

}

export default ViajeEnCurso;