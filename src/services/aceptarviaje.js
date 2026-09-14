import { db } from "../firebase/firebase";
import { ref, update } from "firebase/database";

export const aceptarViaje = async (idSolicitud) => {

  try {

    const solicitudRef = ref(
      db,
      "solicitudes/" + idSolicitud
    );

    await update(
      solicitudRef,
      {
        estado: "Aceptado"
      }
    );

    alert("Viaje aceptado correctamente");

  } catch (error) {

    console.log(error);

    alert("Error al aceptar viaje");

  }

};