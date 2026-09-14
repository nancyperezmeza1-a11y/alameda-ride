import { db } from "../firebase/firebase";
import { ref, push } from "firebase/database";

export const guardarConductor = async (conductor) => {

  try {

    await push(
      ref(db, "conductores"),
      conductor
    );

    alert("Conductor registrado correctamente");

  } catch (error) {

    console.log(error);

    alert("Error al registrar conductor");

  }

};