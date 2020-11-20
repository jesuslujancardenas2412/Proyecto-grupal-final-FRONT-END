import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import ClienteFooter from '../../../../components/ClienteFooter';
import { getCategorias } from '../../../../services/categoriaService';
import { getProductos } from '../../../../services/productoService';
import ClienteCarruselIndex from '../../components/ClienteCarruselIndex';
import ClienteHeaderIndex from '../../components/ClienteHeaderIndex';
import ClienteOfertasDiaIndex from '../../components/ClienteOfertasDiaIndex';

import "./ClienteIndexScreen.css";

const ClienteIndexScreen = () => {

    const [pro, setPro] = useState([]);
    const [cat, setCat] = useState([]);

    const getAllProductos = async () => {

        let objProductos = [];
        let objCategorias = [];

        objProductos = await getProductos().then(data => {
            return data;
        });

        objCategorias = await getCategorias().then(data => {
            return data;
        });

        setPro(objProductos);
        setCat(objCategorias);

    };

    useEffect(() => {
        getAllProductos();
    }, []);


    return (
        <>
            <ClienteHeaderIndex />

            <main>
                <section className="section-top">
                    <ClienteCarruselIndex arregloProductos={pro} arregloCategorias={cat} />
                </section>

                <section className="section-bottom">
                    <ClienteOfertasDiaIndex arregloProductos={pro} arregloCategorias={cat} />
                </section>
            </main>

            <ClienteFooter />
        </>
    )
}

export default ClienteIndexScreen;
