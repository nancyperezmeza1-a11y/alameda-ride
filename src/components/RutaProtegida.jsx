import { useEffect, useState } from "react";

import { Navigate } from "react-router-dom";

import { auth } from "../firebase/firebase";

import {
  onAuthStateChanged
} from "firebase/auth";

function RutaProtegida({ children }) {

  const [usuario, setUsuario] =
    useState(undefined);

  useEffect(() => {

    const unsubscribe =
      onAuthStateChanged(
        auth,
        (user) => {

          setUsuario(user);

        }
      );

    return () =>
      unsubscribe();

  }, []);

  if (usuario === undefined) {

    return (
      <p
        style={{
          textAlign: "center",
          marginTop: "50px"
        }}
      >
        Cargando...
      </p>
    );

  }

  if (!usuario) {

    return (
      <Navigate
        to="/login"
      />
    );

  }

  return children;

}

export default RutaProtegida;