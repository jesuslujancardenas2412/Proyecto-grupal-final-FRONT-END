import { url_api } from "./variables.js";
import { postCategoria, putCategoria, deleteCategoriaById } from "./service/servicio-categorias.js";

// Variables del doc
const tbodyCategoria = document.getElementById("tbody-category");
const formCategoria = document.getElementById("formCategory");
const inputCategoria = document.getElementById("inputCategoryName");
const btnCategoria = document.getElementById("btnAccionCategory");

// Variables temporales
let modo = "crear";
export let categorias = [];
let categoriaGlobal = {};

// Funciones
const getCategoria = () => {
    fetch(`${url_api}/categoria`).then((peticion) => {
        peticion.json().then((data) => {
            categorias = [...data];
            dibujarTabla();
        });
    });
};
getCategoria();

formCategoria.onsubmit = (e) => {
    e.preventDefault();
    if (inputCategoria.value.trim() === "") {
        Swal.fire({
            title: "Error!",
            text: "Todos los campos deben estar llenos",
            icon: "error",
        });
        return;
    }

    if (modo === "crear") {
        Swal.fire({
            title: "¿Crear?",
            text: "¿Seguro que desea crear el registro?",
            icon: "info",
            showCancelButton: true,
        }).then((rpta) => {
            if (rpta.isConfirmed) {
                let objCategoria = {
                    categoria_nom: inputCategoria.value.trim(),
                    categoria_estado: true,
                };
                postCategoria(objCategoria).then((peticion) => {
                    peticion.json().then((data) => {
                        if (data.categoria_id) {
                            Swal.fire({
                                title: "Hecho!",
                                text: "Registro creado exitosamente!",
                                icon: "success",
                                timer: 1500,
                            });
                            inputCategoria.value = "";
                            getCategoria();
                        }
                    });
                });
            }
        });
    } else {
        let objCategoria = {
            categoria_id: categoriaGlobal.categoria_id,
            categoria_nom: inputCategoria.value.trim(),
        };
        putCategoria(objCategoria).then((peticion) => {
            peticion.json().then(() => {
                Swal.fire({
                    title: "Hecho!",
                    text: "Registro guardado exitosamente!",
                    icon: "success",
                    timer: 1500,
                });
                getCategoria();
                modoCrear();
            });
        });
    }
};

const modoCrear = () => {
    categoriaGlobal = {};
    modo = "crear";
    btnCategoria.innerText = "Subir Categoría";
    inputCategoria.value = "";
};

const modoEditar = (categoria) => {
    categoriaGlobal = { ...categoria };
    modo = "editar";
    btnCategoria.innerText = "Guardar Cambios";
    inputCategoria.value = categoriaGlobal.categoria_nom;
};

const eliminar = (id) => {
    Swal.fire({
        title: "¿Eliminar?",
        text: "¿Seguro que desea eliminar el registro?",
        icon: "error",
        showCancelButton: true,
    }).then((rpta) => {
        if (rpta.isConfirmed) {
            deleteCategoriaById(id).then((peticion) => {
                peticion.json().then((data) => {
                    if (data.categoria_id) {
                        Swal.fire({
                            title: "Éxito!",
                            text: "Registro eliminado correctamente",
                            icon: "success",
                            timer: 1500,
                        });
                        getCategoria();
                    }
                });
            });
        }
    });
};

const dibujarTabla = () => {
    tbodyCategoria.innerHTML = "";

    categorias.forEach((categoria) => {
        let tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${categoria.categoria_id}</td>
            <td>${categoria.categoria_nom}</td>
            <td>${categoria.categoria_estado}</td>
        `;

        let btnEditar = document.createElement("button");
        btnEditar.classList.add("btn", "btn-warning", "mr-2");
        btnEditar.innerText = "Editar";
        btnEditar.onclick = () => {
            modoEditar(categoria);
        };

        let btnEliminar = document.createElement("button");
        btnEliminar.classList.add("btn", "btn-danger");
        btnEliminar.innerText = "Eliminar";
        btnEliminar.onclick = () => {
            eliminar(categoria.categoria_id);
        };

        let tdBotones = document.createElement("td");
        tdBotones.appendChild(btnEditar);
        tdBotones.appendChild(btnEliminar);

        tr.appendChild(tdBotones);
        tbodyCategoria.appendChild(tr);
    });
};

