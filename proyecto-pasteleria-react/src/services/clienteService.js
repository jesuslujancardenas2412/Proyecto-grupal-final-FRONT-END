import { URL_BACKEND } from "../environments/environments";

export const getClienteById = async (id) => {
    const peticion = await fetch(`${URL_BACKEND}/cliente/${id}`);
    const data = await peticion.json();
    return data;
};

export const getClienteByDNI = async (dni) => {
    const peticion = await fetch(`${URL_BACKEND}/cliente?cliente_dni=${dni}`);
    const data = await peticion.json();
    return data;
};

export const postCliente = async (objCliente) => {
    const peticion = await fetch(`${URL_BACKEND}/cliente`, {
        method: "POST",
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify(objCliente),
    });
    const data = await peticion.json();
    return data;
};