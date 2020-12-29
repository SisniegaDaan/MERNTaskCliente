import React, { useEffect, useContext } from 'react';

//Conttext de autenticación
import AuthContext from "../../context/autenticacion/authContext";

const Barra = () => {

    const authContext = useContext(AuthContext);
    const { usuario, datosUsuario, cerrarSesion } = authContext;

    useEffect(() => {

        datosUsuario();
        // eslint-disable-next-line
    }, []);

    return (

        <header className="app-header">

            {usuario ? <p className="nombre-usuario">Hola, <span>{usuario.nombre}</span></p> : null}

            <nav className="nav-principal">
                <button
                    className="btn btn-blank cerrar-sesion"
                    onClick={() => cerrarSesion()}
                > Cerrar sesión </button>
            </nav>

        </header>
    );
}

export default Barra;



