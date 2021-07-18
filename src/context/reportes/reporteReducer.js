import {
    CERRAR_MODAL,
    AGREGAR,
    ERROR,
    ABRIR_MODAL_EDAD,
    LIMPIAR,
    ABRIR_MODAL,
    CERRAR_MODAL_EDAD,
    AGREGAR_EDADES,
    LIMPIAR_EDADES
} from '../../types';

export default (state, action) => {
    switch (action.type) {
        case ABRIR_MODAL:
            return {
                ...state,
                abrirModalGanancias: true
            }
        case ABRIR_MODAL_EDAD:
            return {
                ...state,
                abrirModalEdades: true
            }
        case CERRAR_MODAL:
            return {
                ...state,
                abrirModalEdades: false,
                mensajeConfirmación: "",
                citas: []
            }
        case CERRAR_MODAL_EDAD:
            return {
                ...state,
                abrirModalEdades: action.payload,
                mensajeConfirmación: "",
                citas: [],
                segmentacion: []
            }
        case AGREGAR:
            return {
                ...state,
                citas: action.payload,
                formulario: false,
                errorformulario: false,
                mensaje: null,
                segmentacion: []
            }
        case ERROR:
            return {
                ...state,
                mensaje: action.payload
            }
        case LIMPIAR:
            return {
                citas: [],
                mensaje: null,
                mensajeConfirmación: "",
                segmentacion: []

            }
        case AGREGAR_EDADES:
            return {
                segmentacion: action.payload,
                formulario: false,
                errorformulario: false,
                mensajeConfirmación: 'Datos Encontrados',
                mensaje: null,
                citas: [],
            }
        case LIMPIAR_EDADES:
            return {
                segmentacion: [],
                mensaje: null,
                mensajeConfirmación: "",
                citas: []
            }

        default:
            return state;
    }
}