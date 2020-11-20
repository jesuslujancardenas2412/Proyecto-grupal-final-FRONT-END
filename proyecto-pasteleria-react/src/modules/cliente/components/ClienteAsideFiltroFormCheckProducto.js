import React from 'react';
import ClienteFiltroFormCheckProducto from './ClienteFiltroFormCheckProducto';

const ClienteAsideFiltroFormCheckProducto = ({ categorias, filtradoCategorias, modificarProductoCategoria, arregloFiltrado, arregloFiltro }) => {
    return (
        <aside className="productos__filtro">
            <form className="productos__filtro-formulario">
                <label htmlFor="">CATEGORIAS</label>
                {
                    categorias.map(categoria => {
                        return <ClienteFiltroFormCheckProducto key={categoria.categoria_id} categoria={categoria} filtradoCategorias={filtradoCategorias} modificarProductoCategoria={modificarProductoCategoria} arregloFiltrado={arregloFiltrado} arregloFiltro={arregloFiltro}/>
                    })
                }

            </form>

            <hr />

            <form className="productos__filtro-formulario">
                <label htmlFor="">FILTRAR POR PRECIO</label>
                <span id="ex18-label-2a" className="sr-only rango">Example low value</span>
                <span id="ex18-label-2b" className="sr-only rango">Example high value</span>
                <input id="ex18b" type="text" />

                <p>Precio: <span>S/ 100</span> - <span>S/ 400</span></p>
            </form>
        </aside>
    )
}

export default ClienteAsideFiltroFormCheckProducto;
