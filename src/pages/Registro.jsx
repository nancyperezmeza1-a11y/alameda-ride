import { useState } from "react";
import "../App.css";

import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase";

import { guardarResidente } from "../services/residentes";

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

function Registro() {

  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [correo, setCorreo] = useState("");
  const [telefono, setTelefono] = useState("");
  const [conjunto, setConjunto] = useState("");
  const [password, setPassword] = useState("");

  const registrar = async () => {

    try {

      const usuarioAuth =
        await createUserWithEmailAndPassword(
          auth,
          correo,
          password
        );

      const residente = {
        uid: usuarioAuth.user.uid,
        nombre,
        apellido,
        correo,
        telefono,
        conjunto,
        foto: "",
        fechaRegistro: new Date().toISOString()
      };

      await guardarResidente(residente);

      alert("Residente registrado correctamente");

      setNombre("");
      setApellido("");
      setCorreo("");
      setTelefono("");
      setConjunto("");
      setPassword("");

    } catch (error) {

      console.log(error);

      alert(error.code);

    }

  };

  return (
    <div className="contenedor">

      <div className="card">

        <div className="logo">
          <h1>🏢 Registro Residente</h1>
        </div>

        <input
          className="input"
          placeholder="Primer nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />

        <input
          className="input"
          placeholder="Primer apellido"
          value={apellido}
          onChange={(e) => setApellido(e.target.value)}
        />

        <input
          className="input"
          type="email"
          placeholder="Correo electrónico"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
        />

        <input
          className="input"
          placeholder="Número celular"
          value={telefono}
          onChange={(e) => setTelefono(e.target.value)}
        />

        <select
          className="input"
          value={conjunto}
          onChange={(e) => setConjunto(e.target.value)}
        >
          <option value="">
            Seleccione su conjunto
          </option>

          {conjuntos.map((item) => (
            <option key={item}>
              {item}
            </option>
          ))}

        </select>

        <input
          className="input"
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <input
          className="input"
          type="file"
          disabled
        />

        <button
          className="boton"
          onClick={registrar}
        >
          Registrar Residente
        </button>

      </div>

    </div>
  );
}

export default Registro;