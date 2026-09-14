import { db } from "../firebase/firebase";
import { ref, update } from "firebase/database";

export const asignarConductor = async (
  idSolicitud,
  conductor
) => {

  try {

    const solicitudRef = ref(
      db,
      "solicitudes/" + idSolicitud
    );

    await update(
      solicitudRef,
      {
        estado: "Aceptado",

        conductorNombre:
          conductor.nombre,

        conductorApellido:
          conductor.apellido,

        conductorTelefono:
          conductor.telefono,

        conductorPlaca:
          conductor.placa,

        conductorColor:
          conductor.color
      }
    );

    alert(
      "Viaje aceptado correctamente"
    );

  } catch (error) {

    console.log(error);

    alert(
      "Error al aceptar viaje"
    );

  }

};