import { Link } from "react-router-dom";
import "../App.css";

function Administracion() {

  return (

    <div className="contenedor">

      <div className="card">

        <div className="logo">

          <h1>
            ⚙️ Administración
          </h1>

          <p>
            Gestión del sistema
          </p>

        </div>

        <Link
          to="/registro-conductor"
          style={{
            textDecoration: "none"
          }}
        >
          <button
            className="boton"
          >
            ➕ Registrar Conductor
          </button>
        </Link>

        <br />
        <br />

        <Link
          to="/ver-conductores"
          style={{
            textDecoration: "none"
          }}
        >
          <button
            className="boton"
          >
            🚗 Ver Conductores
          </button>
        </Link>

        <br />
        <br />

        <Link
          to="/gestion-solicitudes"
          style={{
            textDecoration: "none"
          }}
        >
          <button
            className="boton"
          >
            📋 Gestión Solicitudes
          </button>
        </Link>

      </div>

    </div>

  );

}

export default Administracion;