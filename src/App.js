import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

//Componentes
import Login from "./components/auth/Login";
import NuevaCuenta from "./components/auth/NuevaCuenta";
import Proyectos from "./components/proyectos/Proyectos";

//Providers
import ProyectoState from "./context/proyectos/proyectoState";
import TareaState from "./context/tareas/tareaState";
import AlertaState from "./context/alertas/alertaState";
import AuthState from "./context/autenticacion/authState";

//Importando funcion que toma el token
import tokenAuth from "./config/tokenAuth";

//Importanto el higher order component
import RutaPrivada from "./rutas/RutaPrivada";

function App() {

  const token = localStorage.getItem("token");
  if(token){

    tokenAuth(token);

  }
    
  return (
    <ProyectoState>
      <TareaState>
        <AlertaState>
          <AuthState>
            <Router>
              <Switch>
                <Route exact path="/" component={Login} />
                <Route exact path="/nueva-cuenta" component={NuevaCuenta} />
                <RutaPrivada exact path="/proyectos" component={Proyectos} />
              </Switch>
            </Router>
          </AuthState>
        </AlertaState>
      </TareaState>
    </ProyectoState>
  );
}

export default App;
