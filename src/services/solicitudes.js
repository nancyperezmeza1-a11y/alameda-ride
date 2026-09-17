import { db } from "../firebase/firebase";
import { ref, push } from "firebase/database";

export const guardarSolicitud = async (solicitud) => {

  try {

    await push(
      ref(db, "solicitudes"),
      solicitud
    );

    return true;

  } catch (error) {

    console.log(error);

    throw error;

  }

};
