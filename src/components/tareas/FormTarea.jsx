import React, { useState, useEffect, useContext } from 'react';
import proyectoContext from "../../context/proyectos/proyectoContext";
import TareaContext from "../../context/tareas/tareaContext";

const FormTarea = () => {

    const proyectosContext = useContext(proyectoContext);
    const { proyecto } = proyectosContext;

    const tareaContext = useContext(TareaContext);
    const { tareaerror, tareaseleccionada, agregarTarea, validarTarea, obtenerTareas, editarTarea } = tareaContext;

    const [tareanueva, tareanuevaUpt] = useState({ nombre: "" });

    useEffect(() => {

        if (tareaseleccionada) {
            tareanuevaUpt(tareaseleccionada);
        } else {
            tareanuevaUpt({ nombre: "" });
        }

    }, [tareaseleccionada])



    //Condiciones de context
    if (!proyecto) return null;

    //Destructuring despues del return null ( ES UNA LISTA PORQUE VIENE DE UN FILTER )
    /* const [proyectoActual] = proyecto; */

    //Acciones del componente
    const handleChange = e => {

        tareanuevaUpt({ ...tareanueva, [e.target.name]: e.target.value })
    }

    const handleSubmit = e => {

        e.preventDefault();

        //Validar
        if (tareanueva.nombre === "") {

            validarTarea();
            return;
        }

        //Agregar tarea
        if (tareaseleccionada) {

            //Editar tarea
            editarTarea(tareanueva);

        } else {

            tareanueva.proyecto = proyecto[0]._id;
            agregarTarea(tareanueva);
        }

        //Reiniciando el form
        tareanuevaUpt({ nombre: "" });
       
        //Obteniendo tareas
        obtenerTareas(proyecto[0].id);
    }

    return (

        <div className="formulario">
            <form onSubmit={handleSubmit}>
                <div className="contenedor-input">
                    <input
                        type="text"
                        className="input-text"
                        placeholder="Nombre de la tarea..."
                        name="nombre"
                        value={tareanueva.nombre}
                        onChange={handleChange}
                    />
                </div>

                <div className="contenedor-input">
                    <input
                        type="submit"
                        className="btn btn-primario btn-submit btn-block"
                        value={tareaseleccionada ? "Guardar cambios" : "Agregar tarea"}
                    />
                </div>
            </form>

            {tareaerror ? <p className="mensaje error">Agrega un nombre a tu tarea</p> : null}

        </div>
    );
}

export default FormTarea;