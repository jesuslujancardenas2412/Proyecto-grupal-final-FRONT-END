import React, { useEffect, useState } from 'react';
import ClienteFooter from '../../../../components/ClienteFooter';
import ClienteHeader from '../../../../components/ClienteHeader';
// import ClientePaginacion from '../../../../components/ClientePaginacion';
import { getCategorias } from '../../../../services/categoriaService';
import { getProductos } from '../../../../services/productoService';
import ClienteAsideFiltroFormCheckProducto from '../../components/ClienteAsideFiltroFormCheckProducto';
import ClienteListaFormCheckProducto from '../../components/ClienteListaFormCheckProducto';

import "./ClienteProductoScreen.css";

const ClienteProductoScreen = () => {

    const [productoCategoria, setProductoCategoria] = useState([]);
    const [productoCategoriaGlobal, setProductoCategoriaGlobal] = useState([]);
    const [categorias, setCategorias] = useState([]);

    const [arregloFiltro, setArregloFiltro] = useState([]);

    // FUNCION QUE TRAE TODOS LOS PRODUCTOS Y SUS CATEGORIAS
    const getAllProductos = async () => {

        let objProductos = [];
        let objCategorias = [];

        objProductos = await getProductos().then(data => {
            return data;
        });

        objCategorias = await getCategorias().then(data => {
            return data;
        });

        let temporal = [];

        for (let i = 0; i < objCategorias.length; i++) {
            objProductos.filter((pro) => {
                if (pro.categoria_id == objCategorias[i].categoria_id) {
                    let obj = { ...pro, categoria_nombre: objCategorias[i].categoria_nom }
                    temporal.push(obj);
                }
            });
        }

        setProductoCategoria(temporal);
        setProductoCategoriaGlobal(temporal);
        setCategorias(objCategorias);

        // console.log(temporal);
        // console.log(objCategorias);

    };

    // FUNCION QUE FILTRA POR CATEGORIAS
    const filtradoCategorias = (arreglo) => {

        let temporal = [];

        for (let i = 0; i < arreglo.length; i++) {
            productoCategoriaGlobal.filter((pro) => {
                if (pro.categoria_id == arreglo[i]) {
                    let obj = { ...pro }
                    temporal.push(obj);
                }
            });
        }

        return temporal;
    };

    // FUNCION QUE SETEA PRODUCTO CATEGORIA
    const modificarProductoCategoria = (nuevo) => {
        if (nuevo.length == 0) {
            setProductoCategoria(productoCategoriaGlobal);
        } else {
            setProductoCategoria(nuevo);
        }

    };

    //ARREGLO FILTRO
    const arregloFiltrado = (valor) => {
        setArregloFiltro(valor)
        console.log("set arreglo filtro");
        console.log(arregloFiltro);
    };



    // LLAMADO A FUNCIONES

    useEffect(() => {
        getAllProductos();
    }, []);

    useEffect(() => {

    }, [productoCategoria]);

    return (
        <>
            <ClienteHeader pagina="PRODUCTOS" />

            <main className="productos">
                <ClienteAsideFiltroFormCheckProducto categorias={categorias} filtradoCategorias={filtradoCategorias} modificarProductoCategoria={modificarProductoCategoria} arregloFiltrado={arregloFiltrado} arregloFiltro={arregloFiltro} />

                <ClienteListaFormCheckProducto productoCategoria={productoCategoria} />

            </main>

            {/* PENDIENTE COLOCAR PAGINACION */}
            {/* <ClientePaginacion /> */}

            <ClienteFooter />
        </>
    )
}

export default ClienteProductoScreen;
