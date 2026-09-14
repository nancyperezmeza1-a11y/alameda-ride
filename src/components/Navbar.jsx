import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { auth } from "../firebase/firebase";

import {
  onAuthStateChanged,
  signOut
} from "firebase/auth";

import AdminLink from "./AdminLink";

function Navbar() {

  const [usuario, setUsuario] =
    useState(null);

  useEffect(() => {

    const unsubscribe =
      onAuthStateChanged(
        auth,
        (user) => {

          setUsuario(user);

        }
      );

    return () => unsubscribe();

  }, []);

  const cerrarSesion =
    async () => {

      try {

        await signOut(auth);

        window.location.href = "/";

      } catch (error) {

        console.log(error);

      }

    };

  return (

    <nav
      style={{
        background: "#0a7b34",
        padding: "15px",
        display: "flex",
        justifyContent: "center",
        gap: "20px",
        flexWrap: "wrap"
      }}
    >

      {!usuario ? (

        <>

          <Link
            to="/"
            style={{
              color: "white",
              textDecoration: "none"
            }}
          >
            Inicio
          </Link>

          <Link
            to="/login"
            style={{
              color: "white",
              textDecoration: "none"
            }}
          >
            Iniciar Sesión
          </Link>

          <Link
            to="/registro"
            style={{
              color: "white",
              textDecoration: "none"
            }}
          >
            Registrarme
          </Link>

        </>

      ) : (

        <>

          <Link
            to="/dashboard"
            style={{
              color: "white",
              textDecoration: "none"
            }}
          >
            Dashboard
          </Link>

          <AdminLink />

          <Link
            to="/perfil"
            style={{
              color: "white",
              textDecoration: "none"
            }}
          >
            Mi Perfil
          </Link>

          <span
            onClick={cerrarSesion}
            style={{
              color: "white",
              cursor: "pointer"
            }}
          >
            Cerrar Sesión
          </span>

        </>

      )}

    </nav>

  );

}

export default Navbar;