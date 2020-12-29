import React, { useContext, Fragment } from 'react';
//Importando el context de proyectos y tareas
import proyectoContext from "../../context/proyectos/proyectoContext";
import TareaContext from "../../context/tareas/tareaContext";
//Componentes
import Tarea from "./Tarea";
//Transition y animaciones
import { CSSTransition, TransitionGroup } from "react-transition-group";

const ListadoTareas = () => {

    //Context de proyecto 
    const proyectosContext = useContext(proyectoContext);
    const { proyecto, eliminarProyecto } = proyectosContext;
    //Context de tareas
    const tareaContext = useContext(TareaContext);
    const { tareasproyecto } = tareaContext;

    if (!proyecto) return <h2>Selecciona un proyecto</h2>;

    //Array destructuring para extraer el proyecto actual
    const [proyectoSeleccion] = proyecto;

    return (

        <Fragment>
            <h2>Proyecto: {proyectoSeleccion.nombre} </h2>
            <ul className="listado-tareas">

                {tareasproyecto.lenght === 0 ? (

                    <li className="tarea"><p>No hay tareas</p></li>
                ) :

                    <TransitionGroup>
                        {tareasproyecto.map(tarea => (
                            <CSSTransition 
                            key={tarea._id}
                            timeout={200}
                            classNames="tarea">
                                <Tarea tarea={tarea} />
                            </CSSTransition>
                        ))}
                    </TransitionGroup>
                }
            </ul>

            <button
                onClick={() => eliminarProyecto(proyectoSeleccion._id)}
                type="button"
                className="btn btn-eliminar">
                Eliminar proyecto &times;
            </button>
        </Fragment>

    );
}

export default ListadoTareas;