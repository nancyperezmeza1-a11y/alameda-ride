import { db } from "../firebase/firebase";

import {
  ref,
  update
} from "firebase/database";

export const actualizarEstadoViaje =
  async (
    idSolicitud,
    estado
  ) => {

    await update(

      ref(
        db,
        `solicitudes/${idSolicitud}`
      ),

      {
        estado
      }

    );

  };