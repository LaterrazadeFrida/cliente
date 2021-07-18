import React, { useReducer } from 'react';
import reporteContext from './reporteContext';
import reporteReducer from './reporteReducer';

import {
    ABRIR_MODAL,
    AGREGAR,
    ERROR,
    LIMPIAR,
    CERRAR_MODAL,
    ABRIR_MODAL_EDAD,
    CERRAR_MODAL_EDAD,
    AGREGAR_EDADES,
    LIMPIAR_EDADES
} from '../../types';

import clienteAxios from '../../config/axios';


const ReporteState = props => {

    const initialState = {
        citas: [],
        errorformulario: false,
        mensaje: null,
        abrirModalGanancias: false,
        abrirModalEdades: false,
        segmentacion: []
    }
    // Dispatch para ejecutar las acciones
    const [state, dispatch] = useReducer(reporteReducer, initialState);


    // Serie de funciones para el CRUD
    const generarReporte = async rango => {
        try {
            const resultado = await clienteAxios.post('/api/reportes', rango);
            console.log(resultado);

            dispatch({
                type: AGREGAR,
                payload: resultado.data
            })
        } catch (error) {
            const alerta = {
                msg: error.response?.data.msg
            }
            dispatch({
                type: ERROR,
                payload: alerta
            })
        }
    }
    const generarReporteEdades = async rango => {
        console.log(rango);
        try {
            const resultado = await clienteAxios.post('/api/reporte-edades', rango);
            console.log(resultado);
            dispatch({
                type: AGREGAR_EDADES,
                payload: resultado.data
            })
        } catch (error) {
            const alerta = {
                msg: error.response?.data.msg
            }
            dispatch({
                type: ERROR,
                payload: alerta
            })
        }
    }

    const mostrarModalGanancias = () => {
        dispatch({
            type: ABRIR_MODAL
        })

    }

    const mostrarModalEdades = () => {
        dispatch({
            type: ABRIR_MODAL_EDAD
        })
    }

    const cerrarModalGanancias = negativo => {
        dispatch({
            type: CERRAR_MODAL,
            payload: negativo
        })
    }

    const cerrarModalEdades = negativo => {
        dispatch({
            type: CERRAR_MODAL_EDAD,
            payload: negativo
        })
    }

    const limpiarReporte = () => {
        dispatch({
            type: LIMPIAR
        })
    }

    const limpiarReporteEdades = () => {
        dispatch({
            type: LIMPIAR_EDADES
        })
    }


    return (
        <reporteContext.Provider
            value={{
                citas: state.citas,
                abrirModalGanancias: state.abrirModalGanancias,
                mensaje: state.mensaje,
                abrirModalEdades: state.abrirModalEdades,
                segmentacion: state.segmentacion,
                generarReporte,
                mostrarModalGanancias,
                cerrarModalGanancias,
                limpiarReporte,
                mostrarModalEdades,
                cerrarModalEdades,
                generarReporteEdades,
                limpiarReporteEdades
            }}
        >
            {props.children}
        </reporteContext.Provider>

    )
}
export default ReporteState;