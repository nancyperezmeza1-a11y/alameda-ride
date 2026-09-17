import { useState } from "react";
import "../App.css";

import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase";

import { guardarConductor } from "../services/conductores";
import Buscador from "../components/Buscador";
import { useNavigate } from "react-router-dom";


const conjuntos = [
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

function RegistroConductor() {
  const navigate = useNavigate();

  const [nombre, setNombre] =
    useState("");

  const [apellido, setApellido] =
    useState("");

  const [correo, setCorreo] =
    useState("");

  const [telefono, setTelefono] =
    useState("");

  const [conjunto, setConjunto] =
    useState("");

  const [placa, setPlaca] =
    useState("");

  const [color, setColor] =
    useState("");

  const [password, setPassword] =
    useState("");

  const registrar = async () => {

    try {

      const usuarioAuth =
        await createUserWithEmailAndPassword(
          auth,
          correo,
          password
        );

      const conductor = {

        uid:
          usuarioAuth.user.uid,

        nombre,

        apellido,

        correo,

        telefono,

        conjunto,

        placa,

        color,

        activo: true,

        foto: "",

        fechaRegistro:
          new Date().toISOString()

      };

      await guardarConductor(
        conductor
      );

      alert(
  "Conductor registrado correctamente"
);

navigate("/ver-conductores");


    } catch (error) {

      console.log(error);

      alert(error.code);

    }

  };

  return (

    <div className="contenedor">

      <div className="card">

        <div className="logo">

          <h1>
            🚗 Registro Conductor
          </h1>

        </div>

        <input
          className="input"
          placeholder="Primer nombre"
          value={nombre}
          onChange={(e) =>
            setNombre(
              e.target.value
            )
          }
        />

        <input
          className="input"
          placeholder="Primer apellido"
          value={apellido}
          onChange={(e) =>
            setApellido(
              e.target.value
            )
          }
        />

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
          placeholder="Número celular"
          value={telefono}
          onChange={(e) =>
            setTelefono(
              e.target.value
            )
          }
        />

        <Buscador
        lista={conjuntos}
        valor={conjunto}
        setValor={setConjunto}
        placeholder="🔍 Buscar conjunto..."
        />
          

        <input
          className="input"
          placeholder="Placa del vehículo"
          value={placa}
          onChange={(e) =>
            setPlaca(
              e.target.value
            )
          }
        />

        <input
          className="input"
          placeholder="Color del vehículo"
          value={color}
          onChange={(e) =>
            setColor(
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
          onClick={registrar}
        >
          Registrar Conductor
        </button>

      </div>

    </div>

  );

}

export default RegistroConductor;