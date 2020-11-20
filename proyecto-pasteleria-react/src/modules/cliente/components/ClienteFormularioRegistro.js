import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Swal from "sweetalert2";
import { getClienteByDNI, postCliente } from '../../../services/clienteService';
import { getUsuarioByEmail, postUsuario } from '../../../services/usuarioService';

const formularioVacio = {
    cliente_nom: "",
    cliente_apepat: "",
    cliente_apemat: "",
    cliente_dni: "",
    cliente_tel: "",
    cliente_dir: "",
    cliente_distrito: 0,
    cliente_distrito_nombre: "",
    usuario_email: "",
    usuario_password: "",
    usuario_password_confirm: "",
};

const ClienteFormularioRegistro = () => {

    const [formulario, setFormulario] = useState(formularioVacio);

    const history = useHistory();

    const handleChange = (e) => {

        // console.log("VALOR DE EVENTO");
        // console.log(e.target.type);

        let valor = e.target.type === "checkbox" ? e.target.checked : e.target.value;
        let distrito = formulario.cliente_distrito_nombre;

        // recuperamos el nombre del distrito
        if (e.target.type === "select-one") {
            distrito = e.target.options[e.target.selectedIndex].text;
        }

        // console.log(valor);

        setFormulario({
            ...formulario,
            [e.target.name]: valor,
            cliente_distrito_nombre: distrito,
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        // recuperamos los datos del formulario
        const form = { ...formulario };

        // verificar campos vacios
        if (
            (form.cliente_nom.trim() === "") |
            (form.cliente_apepat.trim() === "") |
            (form.cliente_apemat.trim() === "") |
            (form.cliente_dni.trim() === "") |
            (form.cliente_tel.trim() === "") |
            (form.cliente_dir.trim() === "") |
            (form.cliente_distrito == "0") |
            (form.usuario_email.trim() === "") |
            (form.usuario_password.trim() === "") |
            (form.usuario_password_confirm.trim() === "")
        ) {
            Swal.fire({
                title: "Upss!!!",
                text: "Los campos no deben estar vacíos",
                icon: "warning",
            });
            return;
        }

        // verificar longitud del campo DNI
        if (form.cliente_dni.trim().length < 8) {
            Swal.fire({
                title: "Upss!!!",
                text: "El DNI debe contener 8 digitos",
                icon: "warning",
            });
            return;
        }

        // verificar que las contraseñas coincidan
        if (form.usuario_password.trim() !== form.usuario_password_confirm.trim()) {
            Swal.fire({
                title: "Upss!!!",
                text: "Las contraseñas deben ser iguales",
                icon: "warning",
            });
            return;
        }

        // validar email
        let mailformat = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

        if (!form.usuario_email.match(mailformat)) {
            Swal.fire({
                title: "Upss!!!",
                text: "Debes ingresar una direccion de correo valida",
                icon: "warning",
            });
            return;
        }

        // verificar si ya existe un email registrado
        let usuarioEmail = [];
        usuarioEmail = await getUsuarioByEmail(form.usuario_email).then(data => {
            if (data !== null) {
                let busqueda = data.filter((email) => {
                    if (email.usuario_email == form.usuario_email) {
                        return email;
                    }
                    return undefined;
                });
                return busqueda;
            }
        });

        // console.log("email");
        // console.log(usuarioEmail.length);

        if (usuarioEmail.length > 0) {
            Swal.fire({
                title: "Upss!!!",
                text: "El email ingresado ya se encuentra registrado",
                icon: "warning",
            });
            return;
        }
        // verificar si ya existe un DNI registrado en la tabla clientes
        let clienteDNI = await getClienteByDNI(form.cliente_dni).then(data => data);

        if (clienteDNI.length > 0) {
            Swal.fire({
                title: "Upss!!!",
                text: "El DNI ya se encuentra registrado. Debe iniciar sesion",
                icon: "warning",
            });
            return;
        }


        // si todo esta correcto, se realizara el registro

        const dataUsuario = {
            tipousuario_id: 1,
            usuario_email: form.usuario_email,
            usuario_password: form.usuario_password,
            usuario_estado: true,
        }

        const dataCliente = {
            usuario_id: 0,
            cliente_nom: form.cliente_nom,
            cliente_apepat: form.cliente_apepat,
            cliente_apemat: form.cliente_apemat,
            cliente_dni: form.cliente_dni,
            cliente_tel: form.cliente_tel,
            cliente_dir: form.cliente_dir + " - " + form.cliente_distrito_nombre,
            cliente_estado: true,
        }

        // debemos crear primero el usuario
        postUsuario(dataUsuario).then(rpta => {
            // console.log("USUARIO CREADO");

            if (rpta.usuario_id) {

                let objCliente = {
                    ...dataCliente,
                    usuario_id: rpta.usuario_id,
                };

                // si todo esta correcto, creamos el cliente
                postCliente(objCliente).then(data => {
                    if (data.cliente_id) {
                        // limpiamos el formulario
                        setFormulario(formularioVacio);

                        Swal.fire({
                            position: 'top-end',
                            icon: 'success',
                            title: 'Registro completo',
                            showConfirmButton: false,
                            timer: 1500
                        })

                        history.push("/login");
                    }
                })
            } else {
                Swal.fire({
                    position: 'top-end',
                    icon: 'error',
                    title: 'Error al registrar',
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        })

    }


    return (
        <form className="needs-validation" noValidate autoComplete="off" onSubmit={handleSubmit}>
            <div className="form-row">
                {/* NOMBRE */}
                <div className="col-md-4 mb-3 mt-3">
                    <label className="registro__label" htmlFor="inputName">Nombre</label>
                    <input
                        type="text"
                        className="form-control input-registro"
                        id="inputName"
                        placeholder="Ingrese nombre"
                        value={formulario.cliente_nom}
                        name="cliente_nom"
                        onChange={handleChange}
                        required
                    />
                    <div className="invalid-tooltip">
                        Por favor, ingresar datos correctos.
                    </div>
                </div>


                {/* APELLIDO PATERNO */}
                <div className="col-md-4 mb-3 mt-3">
                    <label className="registro__label" htmlFor="inputLastNameP">Apellido Paterno</label>
                    <input
                        type="text"
                        className="form-control input-registro"
                        id="inputLastNameP"
                        placeholder="Ingrese apellido paterno"
                        value={formulario.cliente_apepat}
                        name="cliente_apepat"
                        onChange={handleChange}
                        required
                    />
                    <div className="invalid-tooltip">
                        Por favor, ingresar datos correctos.
                    </div>
                </div>


                {/* APELLIDO MATERNO */}
                <div className="col-md-4 mb-3 mt-3">
                    <label className="registro__label" htmlFor="inputLastNameM">Apellido Materno</label>
                    <input
                        type="text"
                        className="form-control input-registro"
                        id="inputLastNameM"
                        placeholder="Ingrese apellido materno"
                        value={formulario.cliente_apemat}
                        name="cliente_apemat"
                        onChange={handleChange}
                        required
                    />
                    <div className="invalid-tooltip">
                        Por favor, ingresar datos correctos.
                    </div>
                </div>


                {/* DNI */}
                <div className="col-md-6 mb-3">
                    <label className="registro__label" htmlFor="inputDNI">DNI</label>
                    <input
                        type="text"
                        minLength="8"
                        maxLength="8"
                        className="form-control input-registro"
                        id="inputDNI"
                        placeholder="Ingrese número de DNI"
                        value={formulario.cliente_dni}
                        name="cliente_dni"
                        onChange={handleChange}
                        aria-describedby="inputDNIPrepend"
                        required
                    />
                    <div className="invalid-tooltip">
                        Ingrese un DNI válido.
                    </div>
                </div>


                {/* TELEFONO */}
                <div className="col-md-6 mb-3">
                    <label className="registro__label" htmlFor="inputPhone">Celular</label>
                    <div className="input-group">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="inputPhonePrepend">+51</span>
                        </div>
                        <input
                            type="text"
                            minLength="9"
                            maxLength="9"
                            className="form-control input-registro"
                            id="inputPhone"
                            placeholder="Ingrese número celular"
                            value={formulario.cliente_tel}
                            name="cliente_tel"
                            onChange={handleChange}
                            aria-describedby="inputPhonePrepend"
                            required
                        />
                        <div className="invalid-tooltip">
                            Ingrese un número de teléfono válido.
                        </div>
                    </div>
                </div>


                {/* DISTRITO */}
                <div className="col-md-6 mb-3">
                    <label className="registro__label" htmlFor="inputDistrict">Distrito</label>
                    <select
                        className="custom-select"
                        id="inputDistrict"
                        name="cliente_distrito"
                        value={formulario.cliente_distrito}
                        onChange={handleChange}
                        required
                    >
                        <option value="0">Seleccione Distrito</option>
                        <option value="1">ANCON</option>
                        <option value="2">ATE</option>
                        <option value="3">BARRANCO</option>
                        <option value="4">BREÑA</option>
                        <option value="5">CARABAYLLO</option>
                        <option value="6">CHACLACAYO</option>
                        <option value="7">CHORRILLOS</option>
                        <option value="8">CIENEGUILLA</option>
                        <option value="9">COMAS</option>
                        <option value="10">EL AGUSTINO</option>
                        <option value="11">INDEPENDENCIA</option>
                        <option value="12">JESUS MARIA</option>
                        <option value="13">LA MOLINA</option>
                        <option value="14">LA VICTORIA</option>
                        <option value="15">LIMA</option>
                        <option value="16">LINCE</option>
                        <option value="17">LOS OLIVOS</option>
                        <option value="18">LURIGANCHO</option>
                        <option value="19">LURIN</option>
                        <option value="20">MAGDALENA DEL MAR</option>
                        <option value="21">MIRAFLORES</option>
                        <option value="22">PACHACAMAC</option>
                        <option value="23">PUCUSANA</option>
                        <option value="24">PUEBLO LIBRE</option>
                        <option value="25">PUENTE PIEDRA</option>
                        <option value="26">PUNTA HERMOSA</option>
                        <option value="27">PUNTA NEGRA</option>
                        <option value="28">RIMAC</option>
                        <option value="29">SAN BARTOLO</option>
                        <option value="30">SAN BORJA</option>
                        <option value="31">SAN ISIDRO</option>
                        <option value="32">SAN JUAN DE LURIGANCHO</option>
                        <option value="33">SAN JUAN DE MIRAFLORES</option>
                        <option value="34">SAN LUIS</option>
                        <option value="35">SAN MARTIN DE PORRES</option>
                        <option value="36">SAN MIGUEL</option>
                        <option value="37">SANTA ANITA</option>
                        <option value="38">SANTA MARIA DEL MAR</option>
                        <option value="39">SANTA ROSA</option>
                        <option value="40">SANTIAGO DE SURCO</option>
                        <option value="41">SURQUILLO</option>
                        <option value="42">VILLA EL SALVADOR</option>
                        <option value="43">VILLA MARIA DEL TRIUNFO</option>
                    </select>
                    <div className="invalid-feedback">Elija un distrito.</div>
                </div>


                {/* DIRECCION */}
                <div className="col-md-6 mb-3">
                    <label className="registro__label" htmlFor="inputDirection">Dirección</label>
                    <input
                        type="text"
                        className="form-control input-registro"
                        id="inputDirection"
                        placeholder="Av. Grau 225"
                        value={formulario.cliente_dir}
                        name="cliente_dir"
                        onChange={handleChange}
                        required
                    />
                    <div className="invalid-tooltip">
                        Ingrese una dirección.
                    </div>
                </div>


                {/* EMAIL */}
                <div className="col-md-4 mb-3 mt-3">
                    <label className="registro__label" htmlFor="inputCorreo">Correo</label>
                    <input
                        type="email"
                        className="form-control input-registro"
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
                <div className="col-md-4 mb-3 mt-3">
                    <label className="registro__label" htmlFor="inputPasswd1">Contraseña</label>
                    <input
                        type="password"
                        className="form-control input-registro"
                        id="inputPasswd1"
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


                {/* CONFIRMAR CONTRASEÑA */}
                <div className="col-md-4 mb-3 mt-3">
                    <label className="registro__label" htmlFor="inputPasswd2">Confirmar Contraseña</label>
                    <input
                        type="password"
                        className="form-control input-registro"
                        id="inputPasswd2"
                        placeholder="Confirmar contraseña"
                        value={formulario.usuario_password_confirm}
                        name="usuario_password_confirm"
                        onChange={handleChange}
                        required
                    />
                    <div className="invalid-tooltip">
                        Por favor, ingresar datos correctos.
                    </div>
                </div>


                {/* BOTON REGISTRO */}
                <button className="btn btn-outline-success mb-3" type="submit">Registrarse</button>
            </div>
        </form>
    )
}

export default ClienteFormularioRegistro;
