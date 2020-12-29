import React, { useEffect, useContext } from "react";

//Componentes
import Sidebar from "../layout/Sidebar";
import Barra from "../layout/Barra";
import FormTarea from "../tareas/FormTarea";
import ListadoTareas from "../tareas/ListadoTareas";

//Importando el context de autenticación ( se puede en culquier componente que lo necesite )
import AuthContext from "../../context/autenticacion/authContext";

const Proyectos = () => {

    //Extraer la información de autenticación
    const authContext = useContext(AuthContext);
    const { datosUsuario } = authContext;

    useEffect(() => {
        datosUsuario();
        // eslint-disable-next-line
    }, [])

    return (
        <div className="contenedor-app">

            <Sidebar />

            <div className="seccion-principal">

                <Barra />

                <main>

                    <FormTarea />

                    <div className="contenedor-tareas">

                        <ListadoTareas />

                    </div>

                </main>
            </div>
        </div>
    );
};

export default Proyectos;
