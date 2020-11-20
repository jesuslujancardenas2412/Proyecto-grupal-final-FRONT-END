import { url_api } from "./variables.js";
import { postProduct, putProduct, deleteProductById } from "./service/servicio-productos.js";
import { categorias } from "./categorias.js";

// Variables Producto form
const tbody = document.getElementById("tbody-prod");
const form = document.getElementById("formProd");
const category = document.getElementById("inputCategory");
const name = document.getElementById("inputName");
const price = document.getElementById("inputPrice");
const image = document.getElementById("inputImg");
const btnAction = document.getElementById("btnAccion");

let modo = "crear";
let productos = [];
let ProductoGlobal = {};

const getProduct = () => {
    fetch(`${url_api}/producto`).then((peticion) => {
        peticion.json().then((data) => {
            console.log(data);
            productos = [...data];
            dibujarTabla();
        });
    });
};
getProduct();

form.onsubmit = (e) => {
    e.preventDefault();
    if (name.value.trim() === "" || category.value.trim() === "" || price.value.trim() === "" || image.value.trim() === "") {
        Swal.fire({
            title: "ERROR!",
            text: "Todos los campos deben estar llenados",
            icon: "error",
        });
        return;
    }
    if (modo === "crear") {
        Swal.fire({
            title: "¿Crear?",
            text: "¿Seguro que desea ingresar un producto?",
            icon: "info",
            showCancelButton: true,
        }).then((response) => {
            console.log(response);
            if (response.isConfirmed) {
                let objProduct = {
                    categoria_id: category.value.trim(),
                    producto_nom: name.value.trim(),
                    producto_pre: price.value.trim(),
                    producto_img: image.value.trim(),
                    producto_estado: true,
                };
                postProduct(objProduct).then((peticion) => {
                    peticion.json().then((data) => {
                        if (data.producto_id) {
                            Swal.fire({
                                title: "Hecho",
                                text: "Registro creado exitosamente",
                                icon: "success",
                                timer: 1500,
                                showConfirmButton: false,
                            });
                            console.log(data);
                            category.value = "";
                            name.value = "";
                            price.value = "";
                            image.value = "";
                            getProduct();
                        }
                    });
                });
            }
        });
    } else {
        // Modo Editar
        let objProduct = {
            producto_id: ProductoGlobal.producto_id,
            categoria_id: category.value.trim(),
            producto_nom: name.value.trim(),
            producto_pre: price.value.trim(),
            producto_img: image.value.trim(),
        };
        putProduct(objProduct).then((peticion) => {
            peticion.json().then((data) => {
                Swal.fire({
                    title: "Hecho!",
                    text: "Registro guardado exitosamente!",
                    icon: "success",
                    timer: 1500,
                });
                console.log(data);
                getProduct();
                modoCrear();
            });
        });
    }
};

const modoCrear = () => {
    ProductoGlobal = {};
    modo = "crear";
    btnAction.innerText = "Crear Producto";
    category.value = "";
    name.value = "";
    price.value = "";
    image.value = "";
};

const modoEditar = (producto) => {
    ProductoGlobal = { ...producto };
    console.log(ProductoGlobal);
    modo = "editar";
    btnAction.innerText = "Guardar Cambios";
    category.value = ProductoGlobal.categoria_id;
    name.value = ProductoGlobal.producto_nom;
    price.value = ProductoGlobal.producto_pre;
    image.value = ProductoGlobal.producto_img;
};

const eliminar = (id) => {
    Swal.fire({
        title: "¿Eliminar?",
        text: "¿Seguro que desea eliminar un producto?",
        icon: "warning",
        showCancelButton: true,
    }).then((rpta) => {
        if (rpta.isConfirmed) {
            deleteProductById(id).then((peticion) => {
                peticion.json().then((data) => {
                    if (data.producto_id) {
                        Swal.fire({
                            title: "¡Éxito!",
                            text: "Registro eliminado exitosamente",
                            icon: "success",
                            timer: 1500,
                            showConfirmButton: false,
                        });
                        console.log(data);
                        getProduct();
                    }
                });
            });
        }
    });
};

const dibujarTabla = () => {
    tbody.innerHTML = "";
    productos.forEach((Producto) => {
        let tr = document.createElement("tr");
        let nombre_categoria = "prox";
        if (categorias.categoria_id) {
            nombre_categoria = categorias.categoria_nom;
            print(categorias);
        }

        tr.innerHTML = `<td>${Producto.producto_id}</td>
                        <td>${nombre_categoria}</td>
                        <td>${Producto.producto_nom}</td>
                        <td>${Producto.producto_pre}</td>
                        <td>
                            <img src="${Producto.producto_img}" alt="" width="150" height="100"/>
                        </td>
                        <td>${Producto.producto_estado}</td>`;

        let tdBotones = document.createElement("td");

        let btnEditar = document.createElement("button");
        btnEditar.classList.add("btn", "btn-warning", "mr-2");
        btnEditar.innerText = "Editar";
        btnEditar.onclick = () => {
            modoEditar(Producto);
        };

        let btnEliminar = document.createElement("button");
        btnEliminar.classList.add("btn", "btn-danger");
        btnEliminar.innerText = "Eliminar";
        btnEliminar.onclick = () => {
            eliminar(Producto.producto_id);
        };

        tdBotones.appendChild(btnEditar);
        tdBotones.appendChild(btnEliminar);

        tr.appendChild(tdBotones);
        tbody.appendChild(tr);
    });

    // Función para hacer dinámico el select 
    categorias.forEach((categoria) => {
        console.log(categoria);
        let option = document.createElement("option");
        option.value = categoria.categoria_id;
        option.innerText = categoria.categoria_nom;

        category.appendChild(option);
    });
};


