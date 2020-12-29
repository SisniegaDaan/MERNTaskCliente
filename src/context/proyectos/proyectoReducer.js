import {
    FORMULARIO_PROYECTO,
    OBTENER_PROYECTOS,
    AGREGAR_PROYECTO,
    MOSTRAR_ERROR,
    SELECCIONAR_PROYECTO,
    ELIMINAR_PROYECTO,
    PROYECTO_ERROR
} from "../../types";

export default (state, action) => {
    switch (action.type) {

        case FORMULARIO_PROYECTO:
            return {
                ...state, formulario: true
            };

        case OBTENER_PROYECTOS:
            return {
                ...state, proyectos: action.payload
            }

        case AGREGAR_PROYECTO:
            return {
                ...state,
                proyectos: [...state.proyectos, action.payload],
                formulario: false,
                errorformulario: false
            }

        case MOSTRAR_ERROR:
            return {
                ...state, errorformulario: true
            }

        case SELECCIONAR_PROYECTO:
            return {
                ...state, proyecto: state.proyectos.filter(proyecto => proyecto._id === action.payload)
            }

        case ELIMINAR_PROYECTO:
            return {
                ...state, proyectos: state.proyectos.filter(proyecto => proyecto._id !== action.payload), proyecto: null
            }

        case PROYECTO_ERROR:
            return {
                ...state,
                mensaje: action.payload
            }

        default:
            return state;
    }
}