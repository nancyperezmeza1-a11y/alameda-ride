import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDDJSYlXuC6ya7ZJsxJrtdRUtTExJlBrtA",
  authDomain: "alameda-ride.firebaseapp.com",
  databaseURL: "https://alameda-ride-default-rtdb.firebaseio.com",
  projectId: "alameda-ride",
  storageBucket: "alameda-ride.firebasestorage.app",
  messagingSenderId: "662479256407",
  appId: "1:662479256407:web:987b9e553c904debd05c12"
};

const app = initializeApp(firebaseConfig);

export const db = getDatabase(app);
export const auth = getAuth(app);

export default app;