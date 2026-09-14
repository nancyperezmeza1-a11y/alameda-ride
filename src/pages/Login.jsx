import { useState } from "react";
import "../App.css";

import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase";

import { Link } from "react-router-dom";

function Login() {

  const [correo, setCorreo] =
    useState("");

  const [password, setPassword] =
    useState("");

  const iniciarSesion =
    async () => {

      try {

        await signInWithEmailAndPassword(
          auth,
          correo,
          password
        );

        window.location.href =
          "/dashboard";

      } catch (error) {

        console.log(error);

        alert(
          "Correo o contraseña incorrectos"
        );

      }

    };

  return (

    <div className="contenedor">

      <div className="card">

        <div className="logo">

          <h1>
            🚗 Alameda Ride
          </h1>

          <p>
            Inicio de sesión
          </p>

        </div>

        <input
          className="input"
          type="email"
          placeholder="Correo electrónico"
          value={correo}
          onChange={(e) =>
            setCorreo(
              e.target.value
            )
          }
        />

        <input
          className="input"
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) =>
            setPassword(
              e.target.value
            )
          }
        />

        <button
          className="boton"
          onClick={iniciarSesion}
        >
          🔐 Ingresar
        </button>

        <br />
        <br />

        <p>
          ¿Aún no tienes cuenta?
        </p>

        <br />

        <Link
          to="/registro"
          style={{
            textDecoration: "none"
          }}
        >
          <button
            className="boton"
          >
            📝 Registrarme
          </button>
        </Link>

      </div>

    </div>

  );

}

export default Login;