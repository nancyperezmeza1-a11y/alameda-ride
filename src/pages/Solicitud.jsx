import { useState } from "react";
import "../App.css";

import { guardarSolicitud } from "../services/solicitudes";

import { auth, db } from "../firebase/firebase";

import {
  ref,
  get
} from "firebase/database";

const puntos = [

  "Jardín del Río",
  "Muelle del Río",
  "Auto Norte Plaza",
  "D1",
  "ARA",
  "Ísimo",
  "Dollar City",
  "Circunvalar Entrada",
  "Circunvalar Salida",

  "Zafiro",
  "Andarrios",
  "Esmeralda",
  "Flamingo",
  "Silbador",
  "Picaflor",
  "Carpintero",
  "Cardenal",
  "Búho",
  "María Mulata",
  "Colibrí",
  "Pardela",
  "Lira",
  "Alondra",
  "Tucán",
  "Torcaza",
  "Perdiz",
  "Gaviota",
  "Azulejo",
  "Turpial",
  "Cóndor",
  "Amazilia",
  "Amatista",
  "Garzas",
  "Guacamaya",
  "Tórtola",
  "Pelícano",
  "Risueño 2",
  "Canario",
  "Risueño 1",
  "Mirla",
  "Gorrión"

];

function Solicitud() {

  const [origen, setOrigen] =
    useState("");

  const [destino, setDestino] =
    useState("");

  const [acompanantes,
    setAcompanantes] =
    useState("0");

  const [equipaje,
    setEquipaje] =
    useState("No");

  const [observaciones,
    setObservaciones] =
    useState("");

  const publicarSolicitud =
    async () => {

      try {

        const usuario =
          auth.currentUser;

        if (!usuario) {

          alert(
            "Debe iniciar sesión"
          );

          return;

        }

        const residentesRef =
          ref(
            db,
            "residentes"
          );

        const snapshot =
          await get(
            residentesRef
          );

        let residente =
          null;

        if (
          snapshot.exists()
        ) {

          const data =
            snapshot.val();

          Object.keys(data)
            .forEach(
              (key) => {

                if (
                  data[key].correo ===
                  usuario.email
                ) {

                  residente =
                    data[key];

                }

              }
            );

        }

        const solicitud = {

          uid:
            usuario.uid,

          correo:
            usuario.email,

          nombreResidente:
            residente?.nombre || "",

          apellidoResidente:
            residente?.apellido || "",

          telefonoResidente:
            residente?.telefono || "",

          origen,

          destino,

          acompanantes,

          equipaje,

          observaciones,

          estado:
            "Pendiente",

          fecha:
            new Date()
              .toISOString()

        };

        await guardarSolicitud(
          solicitud
        );

        setOrigen("");

        setDestino("");

        setAcompanantes(
          "0"
        );

        setEquipaje(
          "No"
        );

        setObservaciones(
          ""
        );

      } catch (error) {

        console.log(
          error
        );

        alert(
          "Error al publicar solicitud"
        );

      }

    };

  return (

    <div className="contenedor">

      <div className="card">

        <div className="logo">

          <h1>
            🚗 Solicitar Transporte
          </h1>

        </div>

        <select
          className="input"
          value={origen}
          onChange={(e) =>
            setOrigen(
              e.target.value
            )
          }
        >

          <option value="">
            Seleccione origen
          </option>

          {puntos.map(
            (item) => (

              <option
                key={item}
              >
                {item}
              </option>

            )
          )}

        </select>

        <select
          className="input"
          value={destino}
          onChange={(e) =>
            setDestino(
              e.target.value
            )
          }
        >

          <option value="">
            Seleccione destino
          </option>

          {puntos.map(
            (item) => (

              <option
                key={item}
              >
                {item}
              </option>

            )
          )}

        </select>

        <select
          className="input"
          value={acompanantes}
          onChange={(e) =>
            setAcompanantes(
              e.target.value
            )
          }
        >

          <option value="0">
            👥 No viajo con acompañantes
          </option>

          <option value="1">
            👥 1 acompañante
          </option>

          <option value="2">
            👥 2 acompañantes
          </option>

          <option value="3">
            👥 3 acompañantes
          </option>

          <option value="4">
            👥 4 acompañantes
          </option>

        </select>

        <select
          className="input"
          value={equipaje}
          onChange={(e) =>
            setEquipaje(
              e.target.value
            )
          }
        >

          <option value="No">
            🧳 No llevo compras ni equipaje
          </option>

          <option value="Si">
            🧳 Sí llevo compras o equipaje
          </option>

        </select>

        <textarea
          className="input"
          rows="4"
          placeholder="Observaciones opcionales"
          value={observaciones}
          onChange={(e) =>
            setObservaciones(
              e.target.value
            )
          }
        />

        <button
          className="boton"
          onClick={
            publicarSolicitud
          }
        >
          Publicar Solicitud
        </button>

      </div>

    </div>

  );

}

export default Solicitud;