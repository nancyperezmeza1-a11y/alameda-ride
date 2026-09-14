import { db } from "../firebase/firebase";
import { ref, update } from "firebase/database";

export const actualizarEstadoViaje = async (
  idSolicitud,
  estado
) => {

  try {

    const solicitudRef = ref(
      db,
      `solicitudes/${idSolicitud}`
    );

    await update(
      solicitudRef,
      {
        estado: estado
      }
    );

  } catch (error) {

    console.log(error);

    alert(
      "Error al actualizar el estado"
    );

  }

};