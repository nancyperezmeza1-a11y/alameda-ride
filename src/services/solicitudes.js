import { db } from "../firebase/firebase";
import { ref, push } from "firebase/database";

export const guardarSolicitud = async (solicitud) => {

  try {

    await push(
      ref(db, "solicitudes"),
      solicitud
    );

    alert("Solicitud publicada correctamente");

  } catch (error) {

    console.log(error);

    alert("Error al publicar solicitud");

  }

};