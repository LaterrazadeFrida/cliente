import {
    OBTENER,
    ELIMINAR,
    ACTUALIZAR,
    OBTENER_PUNTOS,
    GUARDAR_PUNTAJE
} from '../../types';

export default (state, action) => {
    switch (action.type) {
        case OBTENER:
            return {
                ...state,
                citas: action.payload
            }
        case ELIMINAR:
            return {
                ...state,
                citas: state.citas.filter(cita => cita._id !== action.payload),
            }
        case ACTUALIZAR:
            return {
                ...state,
                citas: state.citas.map(cita => cita._id === action.payload._id ? action.payload : cita)
            }
        case OBTENER_PUNTOS:
            return {
                ...state,
                puntos: action.payload
            }
        case GUARDAR_PUNTAJE:
            return {
                ...state,
                puntaje: action.payload
            }
        default:
            return state;
    }
}