import { db } from "../firebase/firebase";
import { ref, update } from "firebase/database";

export const cancelarSolicitud = async (
  idSolicitud
) => {

  try {

    const solicitudRef = ref(
      db,
      `solicitudes/${idSolicitud}`
    );

    await update(
      solicitudRef,
      {
        estado: "Cancelado"
      }
    );

  } catch (error) {

    console.log(error);

    alert(
      "Error al cancelar solicitud"
    );

  }

};