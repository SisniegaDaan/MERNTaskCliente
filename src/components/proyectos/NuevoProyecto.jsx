import React, { useState, useContext, Fragment } from "react";

//Importando el context
import proyectoContext from "../../context/proyectos/proyectoContext";

const NuevoProyecto = () => { 

  const proyectosContext = useContext(proyectoContext);
  const { formulario, errorformulario, mostrarFormulario, agregarProyecto, mostrarError } = proyectosContext;

  //State del nombre del proyecto nuevo  
  const [proyectonuevo, proyectonuevoUpt] = useState({ nombre: "" }); //Objeto, porque se colocará el id

  const handleSubmit = e => {

    e.preventDefault();

    //Validar el proyecto
    if(proyectonuevo.nombre === ""){

      mostrarError();
      return;
    }

    //Agregar al state
    agregarProyecto(proyectonuevo);

    //Reiniciar el form
    proyectonuevoUpt({nombre: ""})
  }

  return (
    <Fragment>
      <button onClick={ () => mostrarFormulario() }type="button" className="btn btn-block btn-primario">Nuevo proyecto</button>

      {formulario ? (

        <form onSubmit={handleSubmit} className="formulario-nuevo-proyecto">
          <input
            type="text"
            className="input-text"
            placeholder="Nombre del proyecto"
            name="nombre"
            value={proyectonuevo.nombre}
            onChange={e => proyectonuevoUpt({ ...proyectonuevo, [e.target.name]: e.target.value })}
          />

          <input
            type="submit"
            className="btn btn-primario btn-block"
            value="Agregar proyecto"
          />
        </form>

      ) : null }

      {errorformulario ? <p className="mensaje error">Asigna un nombre a tu proyecto</p> : null}
    </Fragment>
  );
};

export default NuevoProyecto;
