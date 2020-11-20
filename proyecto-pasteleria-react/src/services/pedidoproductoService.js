import { URL_BACKEND } from "../environments/environments";

export const postPedidoProducto = async (objPedidoProducto) => {
    const peticion = await fetch(`${URL_BACKEND}/pedidoproducto`, {
        method: "POST",
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify(objPedidoProducto),
    });
    const data = await peticion.json();
    return data;
};