import { URL_BACKEND } from "../environments/environments";

export const getUsuarioByEmail = async (email) => {
    const peticion = await fetch(`${URL_BACKEND}/usuario?usuario_email=${email}`);
    const data = await peticion.json();
    return data;
};

export const postUsuario = async (objUsuario) => {
    const peticion = await fetch(`${URL_BACKEND}/usuario`, {
        method: "POST",
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify(objUsuario),
    });
    const data = await peticion.json();
    return data;
};