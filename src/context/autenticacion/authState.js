import React, { useContext, useReducer } from "react";
import AuthContext from "../autenticacion/authContext";
import AuthReducer from "../autenticacion/authReducer";

import clienteAxios from "../../config/clienteAxios";
import tokenAuth from "../../config/tokenAuth";

import {
    REGISTRO_EXITOSO,
    REGISTRO_ERROR,
    OBTENER_USUARIO,
    LOGIN_EXITOSO,
    LOGIN_ERROR,
    CERRAR_SESION
} from "../../types";

const AuthState = props => {

    const initialState = {
        token: localStorage.getItem("token"),
        autenticado: null,
        usuario: null,
        mensaje: null,
        cargando: true
    }

    const [state, dispatch] = useReducer(AuthReducer, initialState);

    //Funciones
    //Usuario nuevo
    const registrarUsuario = async datos => {

        try {

            //Accion a la base de datos
            const respuesta = await clienteAxios.post("/api/usuarios", datos);
            console.log(respuesta.data);

            dispatch({
                type: REGISTRO_EXITOSO,
                payload: respuesta.data
            });

            //Llamando a la funcion que obtiene la información del usuario autenticado
            datosUsuario();

        } catch (error) {

            console.log(error.response);
            const alerta = {
                msg: error.response.data.msg,
                categoria: "alerta-error"
            };
            //Backend envia una respuesta de error (con error.response de Axios podemos ver ese mensaje)
            dispatch({
                type: REGISTRO_ERROR,
                payload: alerta
            })

        }
    }

    //Obtener usuario autenticado desde el state
    const datosUsuario = async () => {

        const token = localStorage.getItem("token");
        if (token) {
            //Funcion para enviar el token por headers
            tokenAuth(token);
        }

        try {

            const respuesta = await clienteAxios.get("/api/auth");
         
            dispatch({
                type: OBTENER_USUARIO,
                payload: respuesta.data.usuario
            });

        } catch (error) {

            console.log(error);
            dispatch({
                type: LOGIN_ERROR
            });
        }
    }

    //Iniciar sesión
    const iniciarSesion = async datos => {

        try {

            const respuesta = await clienteAxios.post("/api/auth", datos);
            
            dispatch({
                type: LOGIN_EXITOSO,
                payload: respuesta.data
            });

            datosUsuario();

        } catch (error) {

            const alerta = {
                msg: error.response.data.msg,
                categoria: "alerta-error"
            };

            //Backend envia una respuesta de error (con error.response de Axios podemos ver ese mensaje)
            dispatch({
                type: LOGIN_ERROR,
                payload: alerta
            });
        }
    }

    //Cerrar sesión del usuario
    const cerrarSesion = () => {
        dispatch({
            type: CERRAR_SESION
        })


    }

    return (

        <AuthContext.Provider
            value={{

                token: state.token,
                autenticado: state.autenticado,
                usuario: state.usuario,
                mensaje: state.mensaje,
                cargando: state.cargando,
                registrarUsuario,
                iniciarSesion,
                datosUsuario,
                cerrarSesion

            }}>
            {props.children}
        </AuthContext.Provider>

    )


}

export default AuthState;