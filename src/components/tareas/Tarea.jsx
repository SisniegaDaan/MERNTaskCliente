import React, { useContext } from 'react';

import TareaContext from "../../context/tareas/tareaContext";
import proyectoContext from "../../context/proyectos/proyectoContext";

const Tarea = ({ tarea }) => {

    const proyectosContext = useContext(proyectoContext);
    const { proyecto } = proyectosContext;

    const tareaContext = useContext(TareaContext);
    const { obtenerTareas, eliminarTarea, editarTarea, seleccionarTarea /* editarTarea */ } = tareaContext;

    //Eliminar tarea y refresh
    const handleDelete = tareaId => {

        eliminarTarea(tareaId, proyecto[0]._id);
        obtenerTareas(proyecto[0]._id);
    }

    //Editar estado
    const handleEstado = tarea => {

        if (tarea.estado) {

            tarea.estado = false;
        } else {

            tarea.estado = true;
        }

        editarTarea(tarea);
    }

    //Editar tarea
    /* const handleEditar = tarea => {

        editarTarea(tarea);
    } */

    return (

        <li className="tarea sombra">

            <p>{tarea.nombre}</p>

            <div class="estado">

                {tarea.estado ? (

                    <button type="button" className="completo" onClick={() => handleEstado(tarea)}>
                        Completo
                    </button>

                ) : (

                        <button type="button" className="incompleto" onClick={() => handleEstado(tarea)}>
                            Incompleto
                        </button>

                    )
                }
            </div>

            <div className="acciones">

                <button type="button" className="btn btn-primario" onClick={() => seleccionarTarea(tarea)}>
                    Editar
                </button>

                <button onClick={() => handleDelete(tarea._id)} type="button" className="btn btn-secundario">
                    Eliminar
                </button>

            </div>
        </li>

    );
}

export default Tarea;