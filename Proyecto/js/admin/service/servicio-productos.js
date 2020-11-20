import { url_api } from "./../variables.js";

export const postProduct = (objProduct) => {
    return fetch(`${url_api}/producto`, {
        method: "POST",
        body: JSON.stringify(objProduct),
        headers: {
            "Content-Type": "application/json",
        },
    });
};

export const putProduct = (objProduct) => {
    let objProductNuevo = {
        producto_id: objProduct.producto_id,
        categoria_id: objProduct.categoria_id,
        producto_nom: objProduct.producto_nom,
        producto_pre: objProduct.producto_pre,
        producto_img: objProduct.producto_img,
    };

    return fetch(`${url_api}/producto/${objProduct.producto_id}`, {
        method: "PUT",
        body: JSON.stringify(objProductNuevo),
        headers: {
            "Content-type": "Application/json",
        },
    });
};

export const deleteProductById = (id) => {
    return fetch(`${url_api}/producto/${id}`, {
        method: "DELETE",
    });
};
