import { url_api } from "./../variables.js";

export const postCategoria = (objCategoria) => {
    return fetch(`${url_api}/categoria`, {
        method: "POST",
        body: JSON.stringify(objCategoria),
        headers: {
            "Content-Type": "application/json",
        },
    });
};

export const putCategoria = (objCategoria) => {
    let objCategoriaNueva = {
        categoria_id: objCategoria.categoria_id,
        categoria_nom: objCategoria.categoria_nom,
        categoria_estado: objCategoria.categoria_estado,
    };

    return fetch(`${url_api}/categoria/${objCategoria.categoria_id}`, {
        method: "PUT",
        body: JSON.stringify(objCategoriaNueva),
        headers: {
            "Content-type": "Application/json",
        },
    });
};

export const deleteCategoriaById = (id) => {
    return fetch(`${url_api}/categoria/${id}`, {
        method: "DELETE",
    });
};