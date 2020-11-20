import React, { useContext } from 'react';
import ClienteContext from '../context/ClienteContext';
import ClienteTablaItemCarrito from './ClienteTablaItemCarrito';

const ClienteTablaCarrito = () => {

    const { globalPedidos } = useContext(ClienteContext);

    // console.log("GLOBAL PEDIDOS CALIENTE TABLA CARRITO");
    // console.log(globalPedidos);

    return (
        <table className="table table-striped text-center info-tabla">
            <thead className="info-tabla-cabecera">
                <tr>
                    <th></th>
                    <th>Producto</th>
                    <th>Precio</th>
                    <th>Cantidad</th>
                    <th>Subtotal</th>
                    <th></th>
                </tr>
            </thead>

            <tbody className="info-tabla-cuerpo">

                {
                    globalPedidos.map(pedido => {
                        return <ClienteTablaItemCarrito key={pedido.producto_id} pedido={pedido} />
                    })
                }

            </tbody>
        </table>
    )
}

export default ClienteTablaCarrito;
