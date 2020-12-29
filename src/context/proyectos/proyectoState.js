import React, { useReducer } from 'react';
/* import { v4 as uuid } from "uuid"; */

import proyectoContext from "./proyectoContext";
import proyectoReducer from "./proyectoReducer";

//Cliente Axios para consulta a la API
import clienteAxios from "../../config/clienteAxios";

//Types
import {
    FORMULARIO_PROYECTO,
    OBTENER_PROYECTOS,
    AGREGAR_PROYECTO,
    MOSTRAR_ERROR,
    SELECCIONAR_PROYECTO,
    ELIMINAR_PROYECTO,
    PROYECTO_ERROR
} from "../../types/index";

const ProyectoState = props => {

    //Proyectos de la base de datos (POR AHORA AQUÍ, antes de meter DB)
    /* const proyectos = [
        { id: 1, name: "Cotizador" },
        { id: 2, name: "Tienda virtual" },
        { id: 3, name: "Proyecto MERN" }] */

    const initialState = {
        proyectos: [],
        formulario: false,
        errorformulario: false,
        proyecto: null,
        mensaje: null
    }

    //Dispatch para ejecutar las acciones
    const [state, dispatch] = useReducer(proyectoReducer, initialState);

    //Serie de funciones para el CRUD
    const mostrarFormulario = () => {
        dispatch({
            type: FORMULARIO_PROYECTO
        });
    }

    const obtenerProyectos = async () => {

        try {

            const resultado = await clienteAxios.get("/api/proyectos");
            console.log(resultado.data.proyectos);

            dispatch({
                type: OBTENER_PROYECTOS,
                payload: resultado.data.proyectos
            });

        } catch (error) {

            const alerta = {
                msg: "Hubo un error",
                categoria: "alerta-error"
            }

            dispatch({
                type: PROYECTO_ERROR,
                payload: alerta
            });
        }
    }

    const mostrarError = () => {
        dispatch({
            type: MOSTRAR_ERROR,
        })
    }

    const agregarProyecto = async proyectonuevo => {

        //Antes de Mongo
        /* proyectonuevo.id = uuid(); */
        try {

            const resultado = await clienteAxios.post("/api/proyectos", proyectonuevo);
            dispatch({
                type: AGREGAR_PROYECTO,
                payload: resultado.data
            })

        } catch (error) {

            console.log(error);
        }
    }

    const seleccionarProyecto = proyectoId => {
        dispatch({
            type: SELECCIONAR_PROYECTO,
            payload: proyectoId
        });
    }

    const eliminarProyecto = async proyectoId => {

        try {

            //Consulta a la API (delete)
            await clienteAxios.delete(`/api/proyectos/${proyectoId}`);

            dispatch({

                type: ELIMINAR_PROYECTO,
                payload: proyectoId
            });

        } catch (error) {

            const alerta = {

                msg: "Hubo un error",
                categoria: "alerta-error"
            }

            dispatch({
                type: PROYECTO_ERROR,
                payload: alerta
            });
        }

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
                mensaje: state.mensaje,
                mostrarFormulario,
                obtenerProyectos,
                agregarProyecto,
                mostrarError,
                seleccionarProyecto,
                eliminarProyecto

            }}>
            {props.children}
        </proyectoContext.Provider>
    )
}

export default ProyectoState;