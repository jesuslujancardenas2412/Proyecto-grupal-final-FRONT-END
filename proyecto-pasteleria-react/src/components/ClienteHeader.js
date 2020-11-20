import React, { useContext } from 'react';
import { Button, Form, FormControl, Nav, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import logo from "./../assets/img/logo_transparente.png";
import ClienteContext from '../modules/cliente/context/ClienteContext';

import "./ClienteHeader.css";

const ClienteHeader = ({ pagina }) => {

    const { clienteActivo, cerrarSesionCliente } = useContext(ClienteContext);

    return (
        <header className="header-2">
            <Navbar className="p-0 contenedor__navbar" collapseOnSelect expand="md">

                <Navbar.Brand className="p-0" href="#home">
                    <img src={logo} alt="" loading="lazy" />
                </Navbar.Brand>

                <Navbar.Toggle className="d-lg-none" aria-controls="responsive-navbar-nav" >
                    <span className="navbar-toggler-icon">
                        <i className="fas fa-bars"></i>
                    </span>
                </Navbar.Toggle>

                <Navbar.Collapse id="responsive-navbar-nav contenedor__navbar-colapsado">
                    <Nav className="mr-auto mt-2 mt-lg-0 contenedor__navbar-colapsado-nav">
                        <NavLink className="nav-link item-enlace" activeClassName="active" to={"/"} ><span className="item-enlace-texto">INICIO</span></NavLink>
                        <NavLink className="nav-link item-enlace" activeClassName="active" to={"/productos"} ><span className="item-enlace-texto">PRODUCTOS</span></NavLink>
                        <NavLink className="nav-link item-enlace" activeClassName="active" to={"/"} ><span className="item-enlace-texto">NOSOTROS</span></NavLink>
                        <NavLink className="nav-link item-enlace" activeClassName="active" to={"/"} ><span className="item-enlace-texto">CONTACTO</span></NavLink>

                        {/* <Nav.Link className="item-enlace item-busqueda py-0">
                            <Form inline className="my-2 my-lg-0 mr-3 item-busqueda-form">
                                <FormControl className="mr-sm-2 item-busqueda-form-input" type="text" placeholder="Búsqueda" />
                                <Button variant="my-2 my-sm-0 item-busqueda-form-button">
                                    <i className="fas fa-search"></i>
                                </Button>
                            </Form>
                        </Nav.Link> */}

                        {/* <NavLink className="item-enlace item-carrito nav-link" to={"/login"}>
                            <div>
                                <i class="fas fa-user mr-3"><span>Login</span></i>
                            </div>
                        </NavLink>

                        <NavLink className="item-enlace item-carrito nav-link" to={"/registro"}>
                            <div>
                                <i class="fas fa-user-plus mr-3"><span>Registro</span></i>
                            </div>
                        </NavLink> */}

                        {/* SESION INICIADA */}
                        <NavLink className={clienteActivo ? "item-enlace item-login nav-link" : "item-enlace item-carrito nav-link"} to={clienteActivo ? "#" : "/login"}>
                            <div>
                                {
                                    clienteActivo === null ?
                                        <i className="fas fa-user-plus mr-3"><span>Login</span></i>
                                        :
                                        <i className="fas fa-user-tie mr-3"><span>{clienteActivo.cliente_nom} {clienteActivo.cliente_apepat}</span></i>
                                }
                            </div>
                        </NavLink>

                        <NavLink className="item-enlace item-carrito nav-link" to={"/registro"} hidden={clienteActivo === null ? false : true}>
                            <div>
                                <i className="fas fa-user mr-3"><span>Registro</span></i>
                            </div>
                        </NavLink>

                        <NavLink className="item-enlace item-carrito nav-link" to={"/"} hidden={clienteActivo === null ? true : false}>
                            <div>
                                <i className="fas fa-sign-out-alt mr-3" onClick={() => { cerrarSesionCliente() }}><span>Salir</span></i>
                            </div>
                        </NavLink>
                        {/* SESION INICIADA */}

                        <NavLink className="item-enlace item-carrito nav-link" to={"/carrito"}>
                            <div>
                                <i className="fas fa-shopping-cart mr-3"></i>
                            </div>
                        </NavLink>
                    </Nav>
                </Navbar.Collapse>

            </Navbar>

            <h2 className="text-center">{pagina}</h2>
        </header>
    )
}

export default ClienteHeader;
