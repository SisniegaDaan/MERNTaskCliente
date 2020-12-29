import React, { useContext } from "react";
//Importando el context de proyectos y tareas
import proyectoContext from "../../context/proyectos/proyectoContext";
import TareaContext from "../../context/tareas/tareaContext";

const Proyecto = ({ proyecto }) => {

  //Context de proyectos
  const proyectosContext = useContext(proyectoContext);
  const { seleccionarProyecto } = proyectosContext;
  //Context de tareas
  const tareaContext = useContext(TareaContext);
  const { obtenerTareas } = tareaContext;

  //Creo que va un async aqui
  const handleClick = id => {

    seleccionarProyecto(id);
    obtenerTareas(id);
  }

  return (

    <li>
      <button
        onClick={() => handleClick(proyecto._id)}
        type="button"
        className="btn btn-blank">{proyecto.nombre}</button>
    </li>
  );
};

export default Proyecto;
