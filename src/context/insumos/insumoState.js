import React, { useReducer } from 'react';
import insumoContext from './insumoContext';
import insumoReducer from './insumoReducer';

import {

    ERROR,ACTUALIZAR
} from '../../types';

import clienteAxios from '../../config/axios';


const InsumoState = props => {

    const initialState = {
       insumos: []
    }
    // Dispatch para ejecutar las acciones
    const [state, dispatch] = useReducer(insumoReducer, initialState);


    // Serie de funciones para el CRUD

    // Edita o modifica los insumos
    const ActualizandoInsumos = async gasto => {
        console.log(gasto);

        try {
            const resultado = await clienteAxios.put(`/api/insumos/${gasto.idProducto}`, gasto);
            dispatch({
                type: ACTUALIZAR,
                payload: resultado.data
            })
        } catch (error) {
            const alerta = {
                msg: 'Hubo un error',
                categoria: 'alerta-error'
            }
            dispatch({
                type: ERROR,
                payload: alerta
            })
        }
    }


    return (
        <insumoContext.Provider
            value={{
                ActualizandoInsumos
            }}
        >
            {props.children}
        </insumoContext.Provider>

    )
}
export default InsumoState;