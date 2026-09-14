import { db } from "../firebase/firebase";

import {
  ref,
  update
} from "firebase/database";

export const cambiarEstadoConductor =
  async (
    idConductor,
    estado
  ) => {

    try {

      const conductorRef =
        ref(
          db,
          `conductores/${idConductor}`
        );

      await update(
        conductorRef,
        {
          activo: estado
        }
      );

    } catch (error) {

      console.log(error);

      alert(
        "Error al actualizar conductor"
      );

    }

  };