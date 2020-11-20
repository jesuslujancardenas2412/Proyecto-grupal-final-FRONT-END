import { URL_BACKEND } from "../environments/environments";
import { getCategoriaById } from "./categoriaService";

export const getProductos = async () => {
    const peticion = await fetch(`${URL_BACKEND}/producto`);
    const data = await peticion.json();
    return data;
};

export const getProductoById = async (producto_id) => {
    const peticion = await fetch(`${URL_BACKEND}/producto/${producto_id}`);
    // console.log("peticion");
    // console.log(peticion);

    if (peticion.ok === true) {
        const data = await peticion.json();
        const objCategoria = await getCategoriaById(data.categoria_id);

        const objProducto = {
            ...data,
            objCategoria: objCategoria,
        };
        return objProducto;
    } else {
        return null;
    }
};