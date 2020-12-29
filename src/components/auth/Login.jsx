import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";

//importando el context de auth y alerta
import AuthContext from "../../context/autenticacion/authContext";
import AlertaContext from "../../context/alertas/alertaContext";

const Login = props => {

  //State usuario
  const [usuario, usuarioUpt] = useState({ email: "", password: "" });
  const {email, password} = usuario;

  //Context de auth
  const authContext = useContext(AuthContext);
  const { mensaje, autenticado, iniciarSesion } = authContext;

  //Context de alertas
  const alertaContext = useContext(AlertaContext);
  const { alerta, mostrarAlerta } = alertaContext;

  //En caso de que el usuario o el password no existan
  useEffect(() => {

    if (autenticado) {

      props.history.push("/proyectos");
    }

    if (mensaje) {

      mostrarAlerta(mensaje.msg, mensaje.categoria);
    }

    // eslint-disable-next-line
  }, [mensaje, autenticado, props.history]);


  //Leer inputs
  const handleChange = (e) => {
    usuarioUpt({ ...usuario, [e.target.name]: e.target.value });
  };

  //Iniciar sesión
  const handleSubmit = e => {

    e.preventDefault();

    //Validar campos
    if (email === "" && password === "") {

      mostrarAlerta("Todos los campos son necesarios", "alerta-error");
    }

    //Pasarlo al action
    iniciarSesion({email, password});
  }

  return (
    <div className="form-usuario">

      { alerta ? (<div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>) : null}

      <div className="contenedor-form sombre-dark">
        <h1>Inicia Sesión</h1>

        <form onSubmit={handleSubmit} action="">
          <div className="campo-form">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Tu email"
              value={usuario.email}
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
              value={usuario.password}
              onChange={handleChange}
            />
          </div>

          <div className="campo-form">
            <input
              type="submit"
              className="btn btn-primario btn-block"
              value="Iniciar sesión"
            />
          </div>

          <Link to={"/nueva-cuenta"} className="enlace-cuenta"> Crear cuenta </Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
