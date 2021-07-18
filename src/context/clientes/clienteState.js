import React, { useReducer } from 'react'
import clienteAxios from '../../config/axios';
import clienteReducer from './clienteReducer';
import clienteContext from './clienteContext';

import {
    VALIDAR_FORMULARIO,
    ERROR,
    OBTENER,
    ACTUAL,
    LIMPIAR,
    REGISTRO_EXITOSO,
    REGISTRO_ERROR,
    LIMPIAR_STATE
} from '../../types';


const ClienteState = props => {

    const initialState = {

        clientes: [],
        formulario: false,
        errorformulario: false,
        empleado: null,
        mensaje: null,
        clienteSeleccionado: null,
        textoAlert: '',
        mensajeConfirmación: ''

    }

    // Dispatch para ejecutar las acciones del reducer
    const [state, dispatch] = useReducer(clienteReducer, initialState);

    // Valida el formulario por errores
    const mostrarError = alert => {
        const alerta = {
            msg: alert
        }

        dispatch({
            type: VALIDAR_FORMULARIO,
            payload: alerta
        })
    }


    // Obtener los clientes
    const obtenerClientes = async () => {
        try {
            const resultado = await clienteAxios.get('/api/usuarios');
            dispatch({
                type: OBTENER,
                payload: resultado.data.usuarios
            })
        } catch (error) {
            const alerta = {
                msg: 'Hubo un error',
            }

            dispatch({
                type: ERROR,
                payload: alerta
            })
        }
    }

    // Guarda el empleado que el usuario dio click para editar
    const guardarClienteSeleccionado = empleado => {
        dispatch({
            type: ACTUAL,
            payload: empleado
        })
    }


    //limpia el empleado seleccionado
    const limpiarCliente = () => {
        dispatch({
            type: LIMPIAR
        })
    }


    // // Edita o modifica un servicio
    // const actualizarEmpleado = async empleado => {

    //     try {
    //         const resultado = await clienteAxios.put(`/api/clientes/${empleado._id}`, empleado);
    //         dispatch({
    //             type: ACTUALIZAR,
    //             payload: resultado.data.empleado
    //         })
    //     } catch (error) {
    //     }
    // }


    const registrarCliente = async datos => {
        try {
            const respuesta = await clienteAxios.post('/api/usuarios', datos);
            dispatch({
                type: REGISTRO_EXITOSO,
                payload: respuesta.data
            });

        } catch (error) {
            const alerta = {
                msg: error.response?.data.msg,
            }

            dispatch({
                type: REGISTRO_ERROR,
                payload: alerta

            })
        }
    }

    const limpiarAlert = () => {

        dispatch({
            type: LIMPIAR_STATE,
        })
    }

    return (
        <clienteContext.Provider
            value={{
                clientes: state.clientes,
                formulario: state.formulario,
                errorformulario: state.errorformulario,
                clienteSeleccionado: state.clienteSeleccionado,
                mensaje: state.mensaje,
                mensajeConfirmación: state.mensajeConfirmación,
                mostrarError,
                obtenerClientes,
                guardarClienteSeleccionado,
                limpiarCliente,
                registrarCliente,
                limpiarAlert
            }}
        >
            {props.children}
        </clienteContext.Provider>

    )


}

export default ClienteState;