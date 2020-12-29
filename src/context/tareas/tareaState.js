import React, { useReducer } from 'react';
import { v4 as uuid } from "uuid";
//Importanto context y reducer
import TareaContext from "./tareaContext";
import TareaReducer from "./tareaReducer";
//Client Axios
import clienteAxios from "../../config/clienteAxios";
//Types
import {
    OBTENER_TAREAS,
    AGREGAR_TAREA,
    VALIDAR_TAREA,
    ELIMINAR_TAREA,
    SELECCIONAR_TAREA,
    EDITAR_TAREA
} from "../../types";

const TareaState = props => {

    const initialState = {
        tareasproyecto: [],
        tareaerror: false,
        tareaseleccionada: null
    }

    //Acciones del CRUD para tareas
    const obtenerTareas = async proyecto => {

        try {

            const fetchObtener = await clienteAxios.get("/api/tareas", { params: { proyecto } });
            console.log(fetchObtener);

            dispatch({
                type: OBTENER_TAREAS,
                payload: fetchObtener.data.tareas
            })

        } catch (error) {

            console.log(error);
        }
    }

    const agregarTarea = async tarea => {
        /* tarea.id = uuid(); */
        try {

            const fetchAgregar = await clienteAxios.post("/api/tareas", tarea);
            console.log(fetchAgregar);

            dispatch({
                type: AGREGAR_TAREA,
                payload: fetchAgregar.data.tarea
            });

        } catch (error) {

            console.log(error);
        }
    }

    const validarTarea = () => {
        dispatch({
            type: VALIDAR_TAREA
        })
    }

    const eliminarTarea = async (tareaId, proyecto) => {

        try {

            await clienteAxios.delete(`api/tareas/${tareaId}`, {params: { proyecto }});
            dispatch({
                type: ELIMINAR_TAREA,
                payload: tareaId
            })

        } catch (error) {

            console.log(error);
        }
    }

    const seleccionarTarea = tareaseleccionada => {
        dispatch({
            type: SELECCIONAR_TAREA,
            payload: tareaseleccionada
        })
    }

    const editarTarea = async tareaeditada => {

        try {

            const fetchEditar = await clienteAxios.put(`/api/tareas/${tareaeditada._id}`, tareaeditada);
            dispatch({
                type: EDITAR_TAREA,
                payload: fetchEditar.data.tarea
            })
            
        } catch (error) {

            console.log(error);
        }
    }

    //Creando un dispatch y state
    const [state, dispatch] = useReducer(TareaReducer, initialState);

    return (

        <TareaContext.Provider
            value={{

                tareasproyecto: state.tareasproyecto,
                tareaerror: state.tareaerror,
                tareaseleccionada: state.tareaseleccionada,
                obtenerTareas,
                agregarTarea,
                validarTarea,
                eliminarTarea,
                seleccionarTarea,
                editarTarea

            }}>
            {props.children}
        </TareaContext.Provider>
    );
}

export default TareaState;