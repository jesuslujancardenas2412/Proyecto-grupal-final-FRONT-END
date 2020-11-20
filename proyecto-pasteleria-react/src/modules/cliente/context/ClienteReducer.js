const ClienteReducer = (stateActual, action) => {

    switch (action.type) {

        case "ACTUALIZAR_GLOBAL_PEDIDOS":
            return {
                ...stateActual,
                globalPedidos: [...action.data],
            }

        case "ELIMINAR_PRODUCTO":
            return {
                ...stateActual,
                globalPedidos: action.data,
            }

        case "FINALIZAR_PEDIDO":
            return {
                ...stateActual,
                globalPedidos: [...action.data],
            }

        case "INICIO_SESION":
            return {
                ...stateActual,
                clienteActivo: { ...action.data.cliente },
                token: action.data.token,
            }

        case "CERRAR_SESION":
            return {
                ...stateActual,
                clienteActivo: action.data,
            }

        case "BOTON_PROCESAR":
            return {
                ...stateActual,
                estadoBotonProcesar: action.data,
            }

        case "BOTON_FINALIZAR":
            return {
                ...stateActual,
                estadoBotonFinalizarPedido: action.data,
            }
    }
};

export default ClienteReducer;

/**
 * stateActual, es el estado actual de la variable de estado que se quiere modificar, que viene del ClienteState.
 * action, es lo que se recibe del dispatch que se encuentra en ClienteState.
 * TODO lo que retorna ClienteReducer es el nuevo valor o valor de reemplazo de mi variable de estado.
 */