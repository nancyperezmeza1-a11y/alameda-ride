import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase";

export const crearCuentaConductor = async (
  correo,
  password
) => {

  return await createUserWithEmailAndPassword(
    auth,
    correo,
    password
  );

};