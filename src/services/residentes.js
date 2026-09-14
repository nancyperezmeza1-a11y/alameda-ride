import { db } from "../firebase/firebase";
import { ref, push } from "firebase/database";

export const guardarResidente = async (residente) => {

  try {

    await push(
      ref(db, "residentes"),
      residente
    );

    alert("Residente registrado correctamente");

  } catch (error) {

    console.log(error);

    alert("Error al registrar residente");

  }

};