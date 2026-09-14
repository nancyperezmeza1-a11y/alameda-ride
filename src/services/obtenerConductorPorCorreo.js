import { db } from "../firebase/firebase";
import { ref, get } from "firebase/database";

export const obtenerConductorPorCorreo = async (correo) => {

  const conductoresRef = ref(
    db,
    "conductores"
  );

  const snapshot = await get(
    conductoresRef
  );

  if (!snapshot.exists()) {

    return null;

  }

  const datos =
    snapshot.val();

  let conductor = null;

  Object.keys(datos).forEach(
    (key) => {

      if (
        datos[key].correo === correo
      ) {

        conductor = {
          id: key,
          ...datos[key]
        };

      }

    }
  );

  return conductor;

};