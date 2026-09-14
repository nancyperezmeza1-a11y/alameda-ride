import { auth } from "../firebase/firebase";

export const obtenerUsuarioActual = () => {

  return auth.currentUser;

};