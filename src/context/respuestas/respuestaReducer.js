import {
    AGREGAR,
    ERROR
} from '../../types';

export default (state, action) => {
    switch (action.type) {

        case AGREGAR:
            return {
                ...state,
                mensajeConfirmacion:  action.payload
            }

        case ERROR:
            return {
                ...state,
                mensaje: action.payload
            }

        default:
            return state;
    }
}