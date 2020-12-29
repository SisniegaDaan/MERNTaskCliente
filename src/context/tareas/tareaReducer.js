import {
    OBTENER_TAREAS,
    AGREGAR_TAREA,
    VALIDAR_TAREA,
    ELIMINAR_TAREA,
    SELECCIONAR_TAREA,
    EDITAR_TAREA
} from "../../types";

export default (state, action) => {

    switch (action.type) {

        case OBTENER_TAREAS:
            return {
                ...state, 
                tareasproyecto: action.payload /* tareasproyecto: state.tareasproyecto.filter(tarea => tarea.proyecto === action.payload) */
            }

        case AGREGAR_TAREA:
            return {
                ...state, tareasproyecto: [action.payload, ...state.tareasproyecto], tareaerror: false
            }

        case VALIDAR_TAREA:
            return {
                ...state, tareaerror: true
            }

        case ELIMINAR_TAREA:
            return {
                ...state, tareasproyecto: state.tareasproyecto.filter( tarea => tarea._id !== action.payload)
            }

        case EDITAR_TAREA: 
            return {
                ...state, tareasproyecto: state.tareasproyecto.map(tarea => tarea._id === action.payload._id ? action.payload : tarea ),
                tareaseleccionada: null
            
            }

        case SELECCIONAR_TAREA:
            return {
                ...state, tareaseleccionada: action.payload
            }

        default:
            return state;
    }
}