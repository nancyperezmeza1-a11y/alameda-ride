import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase";

export const crearCuentaResidente = async (
  correo,
  password
) => {

  return await createUserWithEmailAndPassword(
    auth,
    correo,
    password
  );

};