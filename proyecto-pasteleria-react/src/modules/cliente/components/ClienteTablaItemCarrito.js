import React, { useContext, useEffect, useState } from 'react';
import ClienteContext from '../context/ClienteContext';

const ClienteTablaItemCarrito = ({ pedido }) => {

    const { agregarProducto, modificarProducto, eliminarProducto, globalPedidos } = useContext(ClienteContext);
    const [c, actualizarC] = useState(1);

    const restar = () => {
        if (c !== 1) {
            let cant = c - 1;
            let monto = pedido.producto_pre * cant;
            agregarProducto({
                ...pedido,
                cantidad: cant,
                monto: monto,
            })
            actualizarC(c - 1);
        }
    };

    const sumar = () => {
        let cant = c + 1;
        let monto = pedido.producto_pre * cant;
        agregarProducto({
            ...pedido,
            cantidad: cant,
            monto: monto,
        })
        actualizarC(c + 1);
    };

    const verificar = () => {
        const pedidoExistente = globalPedidos.find(objPedido => objPedido.producto_id === pedido.producto_id);
        if (pedidoExistente) {
            pedido = { ...pedidoExistente };
            actualizarC(pedido.cantidad);
        }
        // console.log(pedidoExistente);
        
    };

    useEffect(() => {
        verificar();
    }, [])


    return (
        <tr>
            <td>
                <img className="info-tabla-cuerpo-img" src={pedido.producto_img} alt="" />
            </td>
            <td><strong>{pedido.producto_nom}</strong></td>
            <td>S/ {pedido.producto_pre}</td>
            <td>
                <div className="cantidad">

                    {/* BOTON RESTAR */}
                    <button
                        className="boton-cantidad-left"
                        onClick={() => {
                            restar();
                        }}
                    >
                        -
                    </button>


                    {/* CANTIDAD */}
                    <span>{c}</span>


                    {/* BOTON SUMAR */}
                    <button
                        className="boton-cantidad-right"
                        onClick={() => {
                            sumar();
                        }}
                    >
                        +
                    </button>

                </div>
            </td>
            <td>S/ {pedido.monto}</td>
            <td>
                <button
                    className="boton-eliminar"
                    onClick={() => { 
                        eliminarProducto(pedido.producto_id)
                    }}
                >
                    x
                </button>
            </td>
        </tr>
    )
}

export default ClienteTablaItemCarrito;
