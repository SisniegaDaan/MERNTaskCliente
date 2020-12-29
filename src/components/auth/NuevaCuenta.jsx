import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";

//Context
import AlertaContext from "../../context/alertas/alertaContext";
import AuthContext from "../../context/autenticacion/authContext";

const NuevaCuenta = (props) => {

  //State usuario
  const [cuentanueva, cuentanuevaUpt] = useState({ nombre: "", email: "", password: "", confirmation: "" });
  const {nombre, email, password, confirmation} = cuentanueva;

  //Context de alerta
  const alertaContext = useContext(AlertaContext);
  const { alerta, mostrarAlerta } = alertaContext;
  //Context de autenticación
  const authContext = useContext(AuthContext);
  const { mensaje, autenticado, registrarUsuario } = authContext;

  //Registro duplicado
  useEffect(() => {

    if(autenticado){
      props.history.push("/proyectos");
    }

    if(mensaje){
      mostrarAlerta(mensaje.msg, mensaje.categoria);
    }

    // eslint-disable-next-line

  }, [mensaje, autenticado, props.history]);

  //Leer inputs
  const handleChange = (e) => {
    cuentanuevaUpt({ ...cuentanueva, [e.target.name]: e.target.value });
  };

  //Iniciar sesión
  const handleSubmit = e => {

    e.preventDefault();

    //Validar campos
    for (let campo in cuentanueva) {
      if (cuentanueva[campo] === "") {

        mostrarAlerta("Todos los campos son obligatorios", "alerta-error")
        return;
      }
    }

    //Validar password minimo 6 caracteres
    if (password.length < 6) {

      mostrarAlerta("El password debe ser de al menos 6 caracteres", "alerta-error");
      return;
    }

    //Revisar que los dos passwords sean iguales
    if(password !== confirmation){

      mostrarAlerta("Confirmación incorrecta", "alerta-error");
      return;
    }

    //Pasarlo al action
    registrarUsuario({nombre, email, password});
  }

  return (
    <div className="form-usuario">

      {alerta ? (<div className={`alerta ${alerta.categoria}`}> {alerta.msg} </div>) : null}

      <div className="contenedor-form sombre-dark">
        <h1>Crea una cuenta</h1>
        <form onSubmit={handleSubmit} action="">
          <div className="campo-form">
            <label htmlFor="name">Nombre</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              placeholder="Tu nombre"
              value={cuentanueva.nombre}
              onChange={handleChange}
            />
          </div>

          <div className="campo-form">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Tu email"
              value={cuentanueva.email}
              onChange={handleChange}
            />
          </div>

          <div className="campo-form">
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Tu contraseña"
              value={cuentanueva.password}
              onChange={handleChange}
            />
          </div>

          <div className="campo-form">
            <label htmlFor="confirmation">Confirma tu contraseña</label>
            <input
              type="password"
              id="confirmation"
              name="confirmation"
              placeholder="Tu contraseña nuevamente"
              value={cuentanueva.confirmation}
              onChange={handleChange}
            />
          </div>

          <div className="campo-form">
            <input
              type="submit"
              className="btn btn-primario btn-block"
              value="Crear cuenta"
            />
          </div>

          <Link to={"/"} className="enlace-cuenta"> Volver a Login </Link>
        </form>
      </div>
    </div>
  );
};

export default NuevaCuenta;
