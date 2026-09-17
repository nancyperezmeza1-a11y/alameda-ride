import { useState } from "react";

function Buscador({
  lista,
  valor,
  setValor,
  placeholder
}) {

  const [mostrar, setMostrar] =
    useState(false);

  const filtrados =
    lista.filter((item) =>
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
        type="text"
        className="input"
        placeholder={placeholder}
        value={valor}
        onClick={() =>
          setMostrar(true)
        }
        onChange={(e) => {

          setValor(
            e.target.value
          );

          setMostrar(true);

        }}
      />

      {mostrar && (

        <div
          className="buscador-lista"
        >

          {filtrados.length === 0 ? (

            <div
              className="buscador-item"
            >
              Sin resultados
            </div>

          ) : (

            filtrados.map(
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
            )

          )}

        </div>

      )}

    </div>

  );

}

export default Buscador;
