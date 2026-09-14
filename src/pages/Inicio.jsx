import "../App.css";
import { Link } from "react-router-dom";

function Inicio() {

  return (

    <div className="contenedor">

      <div className="card">

        <div className="logo">

          <h1>
            🚗 Alameda Ride
          </h1>

          <p>
            Transporte seguro para residentes de Alameda del Río
          </p>

        </div>

        <br />

        <h3>
          Bienvenido
        </h3>

        <br />

        <p>
          Solicita transporte de manera rápida,
          segura y confiable dentro de Alameda del Río.
        </p>

        <br />

        <p>
          Conecta con conductores autorizados,
          consulta tus viajes y realiza seguimiento
          de tus solicitudes desde una única plataforma.
        </p>

        <br />

        <p>
          ✅ Conductores verificados
        </p>

        <p>
          ✅ Mayor seguridad para residentes
        </p>

        <p>
          ✅ Seguimiento de solicitudes
        </p>

        <p>
          ✅ Historial de viajes
        </p>

        <p>
          ✅ Plataforma exclusiva de la comunidad
        </p>

        <br />

        <Link
          to="/login"
          style={{
            textDecoration: "none"
          }}
        >
          <button
            className="boton"
          >
            🔐 Iniciar Sesión
          </button>
        </Link>

        <br />
        <br />

        <p>
          ¿Aún no tienes cuenta?
        </p>

        <br />

        <Link
          to="/registro"
          style={{
            textDecoration: "none"
          }}
        >
          <button
            className="boton"
          >
            📝 Registrarme
          </button>
        </Link>

      </div>

    </div>

  );

}

export default Inicio;