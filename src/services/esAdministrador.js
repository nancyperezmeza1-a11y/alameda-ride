import { auth, db } from "../firebase/firebase";

import {
  ref,
  get
} from "firebase/database";

export const esAdministrador =
  async () => {

    try {

      const usuario =
        auth.currentUser;

      if (!usuario) {

        return false;

      }

      const adminRef =
        ref(
          db,
          `administradores/${usuario.uid}`
        );

      const snapshot =
        await get(
          adminRef
        );

      return snapshot.exists();

    } catch (error) {

      console.log(error);

      return false;

    }

  };
