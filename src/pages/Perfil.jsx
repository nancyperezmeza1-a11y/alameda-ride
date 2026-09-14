import { useState, useEffect } from "react";
import "../App.css";

import { auth, db } from "../firebase/firebase";
import { signOut } from "firebase/auth";

import {
  ref,
  get
} from "firebase/database";

function Perfil() {

  const [usuario, setUsuario] =
    useState(null);

  useEffect(() => {

    cargarPerfil();

  }, []);

  const cerrarSesion =
    async () => {

      try {

        await signOut(auth);

        window.location.href =
          "/";

      } catch (error) {

        console.log(error);

      }

    };

  const cargarPerfil =
    async () => {

      try {

        const usuarioActual =
          auth.currentUser;

        if (!usuarioActual) {

          return;

        }

        const correo =
          usuarioActual.email;

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

        const residentesSnapshot =
          await get(
            residentesRef
          );

        const conductoresSnapshot =
          await get(
            conductoresRef
          );

        let encontrado =
          null;

        if (
          residentesSnapshot.exists()
        ) {

          const residentes =
            residentesSnapshot.val();

          Object.keys(
            residentes
          ).forEach(
            (key) => {

              if (
                residentes[key].correo ===
                correo
              ) {

                encontrado = {

                  tipo:
                    "Residente",

                  ...residentes[key]

                };

              }

            }
          );

        }

        if (
          conductoresSnapshot.exists()
        ) {

          const conductores =
            conductoresSnapshot.val();

          Object.keys(
            conductores
          ).forEach(
            (key) => {

              if (
                conductores[key].correo ===
                correo
              ) {

                encontrado = {

                  tipo:
                    "Conductor",

                  ...conductores[key]

                };

              }

            }
          );

        }

        setUsuario(
          encontrado
        );

      } catch (error) {

        console.log(error);

      }

    };

  return (

    <div className="contenedor">

      <div className="card">

        {!usuario ? (

          <p>
            Cargando perfil...
          </p>

        ) : (

          <>

            <div className="logo">

              <h1>
                👤 Mi Perfil
              </h1>

            </div>

            <h2>
              {usuario.nombre}
              {" "}
              {usuario.apellido}
            </h2>

            <br />

            <p>
              📌 {usuario.tipo}
            </p>

            <p>
              📧 {usuario.correo}
            </p>

            <p>
              📞 {usuario.telefono}
            </p>

            <p>
              🏢 {usuario.conjunto}
            </p>

            {usuario.tipo ===
            "Conductor" && (

              <>

                <p>
                  🚗 {usuario.placa}
                </p>

                <p>
                  🎨 {usuario.color}
                </p>

              </>

            )}

            <br />

            <button
              className="boton"
              onClick={
                cerrarSesion
              }
            >
              🚪 Cerrar Sesión
            </button>

          </>

        )}

      </div>

    </div>

  );

}

export default Perfil;