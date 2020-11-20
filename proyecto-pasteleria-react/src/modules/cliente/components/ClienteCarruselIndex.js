import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Button, Carousel } from 'react-bootstrap';
import { arregloSinRepetir } from '../../../services/numerosAleatorios';

import logo from "./../../../assets/img/logo_transparente.png";

const ClienteCarruselIndex = ({ arregloProductos, arregloCategorias }) => {

    // console.log(arregloProductos);
    // console.log(arregloCategorias);

    // generamos un arreglo de 5 numeros aleatorios no repetidos
    const [aleatorio, setAleatorio] = useState(arregloSinRepetir(5));
    const [slider, setSlider] = useState([]);

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

        setSlider(temporal);
        // console.log("tempral");
        // console.log(temporal);

    };

    useEffect(() => {
        getAllProductos();
    }, [arregloProductos, arregloCategorias]);


    return (
        <>
            {
                slider.length === 0 ?
                    <Carousel
                        className="carrusel"
                        fade={true}
                        prevIcon={<span className="carousel-control-next-icon carrusel-flecha"><i className="fas fa-chevron-left"></i></span>}
                        nextIcon={<span className="carousel-control-next-icon carrusel-flecha"><i className="fas fa-chevron-right"></i></span>}
                    >
                        <Carousel.Item className="w-100">
                            <img
                                className="d-block w-100 slider-producto"
                                src={logo}
                                alt="Fourth slide"
                            />
                        </Carousel.Item>

                    </Carousel>
                    :
                    <Carousel fade={true}
                        prevIcon={<span className="carousel-control-next-icon carrusel-flecha"><i className="fas fa-chevron-left"></i></span>}
                        nextIcon={<span className="carousel-control-next-icon carrusel-flecha"><i className="fas fa-chevron-right"></i></span>}
                    >

                        {
                            slider.map(item => {
                                return <Carousel.Item key={item.producto_id}>
                                    <img
                                        className="d-block w-100 slider-producto"
                                        src={item.producto_img}
                                        alt="First slide"
                                    />
                                    <Carousel.Caption>
                                        <h3 className="bg-dark">{item.producto_nom}</h3>
                                    </Carousel.Caption>
                                </Carousel.Item>
                            })
                        }

                    </Carousel>
            }

            <Button className="boton-ordenar">ORDENAR AHORA</Button>
        </>
    )
}

export default ClienteCarruselIndex;
