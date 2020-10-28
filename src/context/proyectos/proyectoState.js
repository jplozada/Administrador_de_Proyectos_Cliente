import React, {useReducer} from 'react';

import proyectoContext from './proyectoContext';
import proyectoReducer from './proyectoReducer';
import clienteAxios from '../../config/axios';
import {
    AGREGAR_PROYECTO,
    FORMULARIO_PROYECTO, 
    OBTENER_PROYECTOS,
    VALIDAR_FORMULARIO,
    PROYECTO_ACTUAL,
    ELIMINAR_PROYECTO
} from '../../types/index';

const ProyectoState = props => {

    const proyectos = [
        {id: 1, nombre: 'Tienda Virtual'},
        {id: 2, nombre: 'Intranet'},
        {id: 3, nombre: 'Diseño de Sitio Web'},
        {id: 4, nombre: 'MERN'}
    ]

    const initialState = {
        proyectos : [],
        formulario : false,
        errorformulario: false,
        proyecto: null
    }

    // Dispatch ára ejecutar las acciones
    const [state, dispatch] = useReducer(proyectoReducer, initialState);
    
    // Serie de funciones para el CRUD
    const mostrarFormulario = () => {
        dispatch({
            type: FORMULARIO_PROYECTO
        })
    }

    // Obtener los proyectos
    const obtenerProyectos = () => {
        dispatch({
            type: OBTENER_PROYECTOS,
            payload: proyectos
        })
    }

    // Agregar nuevo proyecto
    const agregarProyecto = async proyecto => {
        try {
            const resultado = await clienteAxios.post('/api/proyectos', proyecto);
            console.log(resultado);

            //Insertar proyecto en el state
            dispatch({
                type: AGREGAR_PROYECTO,
                payload: resultado.data
            })
        } catch (error) {
            console.log(error);
        }
    }

    // Validar formulario por errores
    const mostrarError = () => {
        dispatch({
            type: VALIDAR_FORMULARIO
        })
    }

    // Selecciona el Poryecto que el usuario dio click
    const proyectoActual = proyectoId => {
        dispatch({
            type: PROYECTO_ACTUAL,
            payload: proyectoId
        })
    }

    // Eliminar un proyecto
    const eliminarProyecto = proyectoId => {
        dispatch({
            type: ELIMINAR_PROYECTO,
            payload: proyectoId
        })
    }

    return (
        <proyectoContext.Provider
            value={{
                proyectos: state.proyectos,
                formulario: state.formulario,
                errorformulario: state.errorformulario,
                proyecto: state.proyecto,
                mostrarFormulario,
                obtenerProyectos,
                agregarProyecto,
                mostrarError,
                proyectoActual,
                eliminarProyecto
            }}
        >
            {props.children}
        </proyectoContext.Provider>
    ) 
}

export default ProyectoState;