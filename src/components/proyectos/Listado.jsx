import React, { useContext, useEffect } from "react";
//Importando el context de proyectos
import proyectoContext from "../../context/proyectos/proyectoContext";
import AlertaContext from "../../context/alertas/alertaContext";
//Componentes
import Proyecto from "./Proyecto";
//Transition y animaciones
import { CSSTransition, TransitionGroup } from "react-transition-group";

const Listado = () => {

    //Extraer proyectos de state inicial
    const proyectosContext = useContext(proyectoContext);
    const { proyectos, mensaje, obtenerProyectos } = proyectosContext;

    const alertaContext = useContext(AlertaContext);
    const { alerta, mostrarAlerta } = alertaContext;

    useEffect(() => {

        if (mensaje) {
            mostrarAlerta(mensaje.msg, mensaje.categoria);
        }

        obtenerProyectos();
    }, [mensaje]);

    //Revisar si tiene contenido
    if (proyectos.length === 0) return <h3>No hay proyectos por aquí, empieza creando uno</h3>;

    return (
        <ul className="listado-proyectos">

            { alerta ? (<div className={`alerta ${mensaje.categoria}`}> {mensaje.msg} </div>) : null}

            <TransitionGroup>

                {proyectos.map(proyecto => (

                    <CSSTransition
                        key={proyecto._id}
                        timeout={200}
                        classNames="proyecto">

                        <Proyecto

                            proyecto={proyecto} />

                    </CSSTransition>

                ))}

            </TransitionGroup>
        </ul>
    );
};

export default Listado;
