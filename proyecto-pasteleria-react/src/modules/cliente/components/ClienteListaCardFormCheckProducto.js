import React, { useContext, useEffect, useState } from 'react';
import ClienteContext from '../context/ClienteContext';

const ClienteListaCardFormCheckProducto = ({ proCat }) => {

    const { agregarProducto, globalPedidos, clienteActivo } = useContext(ClienteContext);

    const [c, actualizarC] = useState(1);
    const [modoBoton, setModoBoton] = useState(false);

    const restar = () => {
        if (c !== 1) {
            actualizarC(c - 1);
        }
    };

    const sumar = () => {
        actualizarC(c + 1);
    };

    const verificar = () => {
        
        const pedidoExistente = globalPedidos.find(objPedido => objPedido.producto_id === proCat.producto_id);
        if (pedidoExistente) {
            proCat = { ...pedidoExistente };
            actualizarC(proCat.cantidad);
            setModoBoton(true);
        }
        // console.log(pedidoExistente);
    };

    useEffect(() => {
        verificar();
    }, [modoBoton, clienteActivo])


    return (
        <div className="card productos__card">
            {/* HOVER PARA AGREGAR AL CARRITO DE COMPRAS */}
            <div className="productos__card-hide">
                <div className="contenedor-boton-cantidad">
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
                        <span className="text-center">{c}</span>


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
                </div>
                <div className="agregar__carrito">
                    {
                        modoBoton ?
                            <button
                                className="actualizar__carrito-boton"
                                onClick={() => {
                                    let monto = proCat.producto_pre * c;
                                    setModoBoton(true);
                                    agregarProducto({
                                        ...proCat,
                                        cantidad: c,
                                        monto: monto,
                                    })
                                }}
                            >
                                Actualizar <i className="fas fa-shopping-cart"></i>
                            </button>
                            :
                            <button
                                className="agregar__carrito-boton"
                                onClick={() => {
                                    let monto = proCat.producto_pre * c;
                                    setModoBoton(true);
                                    agregarProducto({
                                        ...proCat,
                                        cantidad: c,
                                        monto: monto,
                                    })
                                }}
                            >
                                Agregar a <i className="fas fa-shopping-cart"></i>
                            </button>
                    }
                </div>
            </div>

            {/* CARD DE PRODUCTOS */}
            <img className="card-img-top productos__card-img" src={proCat.producto_img} alt="producto" />
            <div className="card-body text-center">
                <h5 className="card-title">{proCat.producto_nom}</h5>
                <h6 className="card-subtitle">{proCat.categoria_nombre}</h6>
                <p className="card-text">S/. {proCat.producto_pre}</p>
            </div>
        </div>
    )
}

export default ClienteListaCardFormCheckProducto;
