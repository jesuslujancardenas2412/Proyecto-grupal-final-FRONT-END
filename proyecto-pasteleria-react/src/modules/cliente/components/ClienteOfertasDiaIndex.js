import React, { useState } from 'react';
import { useEffect } from 'react';
import { arregloSinRepetir } from '../../../services/numerosAleatorios';
import ClienteOfertasDiaCardIndex from './ClienteOfertasDiaCardIndex';

const ClienteOfertasDiaIndex = ({ arregloProductos, arregloCategorias }) => {

    // generamos un arreglo de 5 numeros aleatorios no repetidos
    const [aleatorio, setAleatorio] = useState(arregloSinRepetir(6));
    const [cardProducto, setCardProducto] = useState([]);

    const getAllProductos = async () => {

        // mapeo del arreglo de indices (aleatorio) que coincidan con el indice del objProductos
        const filtradoProductos = aleatorio.map((item) => arregloProductos[item - 1]);

        let temporal = [];

        for (let i = 0; i < arregloCategorias.length; i++) {
            filtradoProductos.filter((pro) => {
                if (pro.categoria_id == arregloCategorias[i].categoria_id) {
                    let obj = { ...pro, categoria_nombre: arregloCategorias[i].categoria_nom }
                    temporal.push(obj);
                }
            });

        }

        setCardProducto(temporal);

    };

    useEffect(() => {
        getAllProductos();
    }, [arregloProductos, arregloCategorias]);


    return (
        <>
            <div className="section-bottom-fondo"></div>

            <div className="section-bottom-titulo">
                <h3 className="">Sugerencias</h3>
            </div>

            <div className="section-bottom-ofertas row">
                {
                    cardProducto.map(pro => {
                        return <ClienteOfertasDiaCardIndex key={pro.producto_id} producto={pro} />
                    })
                }
            </div>
        </>
    )
}

export default ClienteOfertasDiaIndex;
