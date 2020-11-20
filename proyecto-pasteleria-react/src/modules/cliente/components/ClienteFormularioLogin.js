import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Swal from "sweetalert2";
import { getClienteById } from '../../../services/clienteService';
import { getUsuarioByEmail } from '../../../services/usuarioService';
import ClienteContext from '../context/ClienteContext';

const formularioVacio = {
    usuario_email: "",
    usuario_password: "",
};

const ClienteFormularioLogin = () => {

    const { clienteActivo, inicioSesionCliente } = useContext(ClienteContext);
    const [formulario, setFormulario] = useState(formularioVacio);

    const history = useHistory();

    const handleChange = (e) => {

        // console.log("VALOR DE EVENTO");
        // console.log(e.target.type);

        let valor = e.target.type === "checkbox" ? e.target.checked : e.target.value;

        // console.log(valor);

        setFormulario({
            ...formulario,
            [e.target.name]: valor,
        });
    }


    const handleSubmit = async (e) => {
        e.preventDefault();

        // recuperamos los datos del formulario
        const form = { ...formulario };

        // console.log("FORMULARIO RECUPERADO");
        // console.log(form);

        // verificar campos vacios
        if (
            (form.usuario_email.trim() === "") |
            (form.usuario_password.trim() === "")
        ) {
            Swal.fire({
                title: "Upss!!!",
                text: "Los campos no deben estar vacíos",
                icon: "warning",
            });
            return;
        }

        // validar email
        let mailformat = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

        if (!form.usuario_email.trim().match(mailformat)) {
            Swal.fire({
                title: "Upss!!!",
                text: "Debes ingresar una direccion de correo valida",
                icon: "warning",
            });
            return;
        }

        // verificar si existe un email registrado
        let usuarioEmail = [];
        usuarioEmail = await getUsuarioByEmail(form.usuario_email.trim()).then(data => {
            if (data !== null) {
                let busqueda = data.filter((email) => {
                    if (email.usuario_email == form.usuario_email.trim()) {
                        return email;
                    }
                    return undefined;
                });
                return busqueda;
            }
        });

        // console.log("VERIFICACION EMAIL");
        // console.log(usuarioEmail);

        if (usuarioEmail.length === 0) {
            Swal.fire({
                title: "Upss!!!",
                text: "El email ingresado no existe. Lo invitamos a registrarse",
                icon: "info",
                showClass: {
                    popup: 'animate__animated animate__fadeInDown'
                },
                hideClass: {
                    popup: 'animate__animated animate__fadeOutUp'
                }
            });
            return;
        }

        // verificar contraseña ingresada
        if (form.usuario_password.trim() !== usuarioEmail[0].usuario_password) {
            Swal.fire({
                title: "Upss!!!",
                text: "La contraseña ingresada no es válida",
                icon: "info",
                showClass: {
                    popup: 'animate__animated animate__fadeInDown'
                },
                hideClass: {
                    popup: 'animate__animated animate__fadeOutUp'
                }
            });
            return;
        }

        // LOGUEADO CORRECTAMENTE, RECUPERAMOS LA INFORMACION DE CLIENTE
        const clienteLogueado = await getClienteById(usuarioEmail[0].usuario_id).then(data => data);

        if (clienteLogueado.cliente_id) {
            // console.log("USUARIO LOGUEADO");
            // console.log(clienteLogueado);

            inicioSesionCliente(clienteLogueado);
            // console.log("actualizado state inicio sesion");
            // console.log(clienteActivo);

            // if (localStorage.getItem("token")) {

            //     let data = localStorage.getItem("token");
            //     console.log("contenido token");
            //     console.log(data);
            // }

            history.push("/");

        }



    }



    return (
        <form className="needs-validation" noValidate autoComplete="off" onSubmit={handleSubmit}>
            {/* NOMBRE */}
            <div className="form-row">
                <div className="col-md-12 mb-3 mt-3">
                    <label htmlFor="inputCorreo">Correo</label>
                    <input
                        type="email"
                        className="form-control input-login"
                        id="inputCorreo"
                        placeholder="Ingrese correo electrónico"
                        value={formulario.usuario_email}
                        name="usuario_email"
                        onChange={handleChange}
                        required
                    />
                    <div className="invalid-tooltip">
                        Por favor, ingresar datos correctos.
                    </div>
                </div>


                {/* CONTRASEÑA */}
                <div className="col-md-12 mb-3 mt-3">
                    <label htmlFor="inputPasswd">Contraseña</label>
                    <input
                        type="password"
                        className="form-control input-login"
                        id="inputPasswd"
                        placeholder="Ingrese contraseña"
                        value={formulario.usuario_password}
                        name="usuario_password"
                        onChange={handleChange}
                        required
                    />
                    <div className="invalid-tooltip">
                        Por favor, ingresar datos correctos.
                    </div>
                </div>
            </div>

            {/* BOTON LOGIN */}
            <button className="btn btn-outline-success mb-3" type="submit">Iniciar Sesión</button>
        </form>
    )
}

export default ClienteFormularioLogin;
