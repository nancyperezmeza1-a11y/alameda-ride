import { useState } from "react";

function Buscador({
  lista,
  valor,
  setValor,
  placeholder
}) {

  const [mostrar,
    setMostrar] =
    useState(false);

  const filtrados =
    lista.filter(
      (item) =>
        item
          .toLowerCase()
          .includes(
            valor.toLowerCase()
          )
    );

  return (

    <div
      className="buscador-container"
    >

      <input
        className="input"
        placeholder={placeholder}
        value={valor}
        onFocus={() =>
          setMostrar(true)
        }
        onChange={(e) =>
          setValor(
            e.target.value
          )
        }
      />

      {mostrar &&
        valor !== "" && (

          <div
            className="buscador-lista"
          >

            {filtrados.map(
              (item) => (

                <div
                  key={item}
                  className="buscador-item"
                  onClick={() => {

                    setValor(item);

                    setMostrar(
                      false
                    );

                  }}
                >
                  {item}
                </div>

              )
            )}

          </div>

      )}

    </div>

  );

}

export default Buscador;