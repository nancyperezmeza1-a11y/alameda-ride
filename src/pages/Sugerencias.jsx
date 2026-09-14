import "../App.css";

function Sugerencias() {
  return (
    <div className="contenedor">

      <div className="card">

        <div className="logo">
          <h1>💡 Sugerencias</h1>
          <p>Ayúdanos a mejorar Alameda Ride</p>
        </div>

        <input
          className="input"
          type="text"
          placeholder="Nombre"
        />

        <textarea
          className="input"
          rows="8"
          placeholder="Escriba aquí su sugerencia para mejorar la plataforma..."
        ></textarea>

        <button className="boton">
          Enviar Sugerencia
        </button>

      </div>

    </div>
  );
}

export default Sugerencias;