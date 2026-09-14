import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { esAdministrador } from "../services/esAdministrador";

function AdminLink() {

  const [admin, setAdmin] =
    useState(false);

  useEffect(() => {

    verificarAdmin();

  }, []);

  const verificarAdmin =
    async () => {

      const resultado =
        await esAdministrador();

      setAdmin(
        resultado
      );

    };

  if (!admin) {

    return null;

  }

  return (

    <Link
      to="/administracion"
      style={{
        color: "white",
        textDecoration: "none"
      }}
    >
      Administración
    </Link>

  );

}

export default AdminLink;