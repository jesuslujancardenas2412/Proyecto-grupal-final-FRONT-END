import React from 'react';

let temporal = [];

const ClienteFiltroFormCheckProducto = ({ categoria, filtradoCategorias, modificarProductoCategoria, arregloFiltrado, arregloFiltro }) => {

    const handleChange = (e) => {
        let valor = e.target.type === "checkbox" ? e.target.checked : e.target.value;

        temporal = [...arregloFiltro];

        if (temporal.length === 0) {
            if (valor) {
                temporal.push(e.target.name)
            }
        } else {

            if (!valor) {
                let item = temporal.indexOf(e.target.name);
                temporal.splice(item, 1);
            } else {
                if (temporal.indexOf(e.target.name) == -1) {
                    temporal.push(e.target.name)
                }
            }
        }

        // console.log("arreglo filtro");
        // console.log(arregloFiltro);

        // console.log("temporal");
        // console.log(temporal);

        arregloFiltrado(temporal);
        let nuevo = filtradoCategorias(temporal);

        // console.log("nuevo");
        // console.log(nuevo);
        modificarProductoCategoria(nuevo);

    };

    return (
        <div className="form-check">
            
            <input
                type="checkbox"
                className="form-check-input"
                id="checkActivo"
                name={categoria.categoria_id}
                onChange={handleChange}
            />

            <label className="form-check-label" htmlFor="checkActivo">{categoria.categoria_nom}</label>
        </div>
    )
}

export default ClienteFiltroFormCheckProducto;
