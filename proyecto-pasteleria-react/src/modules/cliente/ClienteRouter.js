import React from 'react';
import { Route, Switch } from 'react-router-dom';
import ClienteState from './context/ClienteState';
import ClienteCarritoScreen from './screens/carrito/ClienteCarritoScreen';
import ClienteIndexScreen from './screens/index/ClienteIndexScreen';
import ClienteLoginScreen from './screens/login/ClienteLoginScreen';
import ClienteProductoScreen from './screens/producto/ClienteProductoScreen';
import ClienteRegistroScreen from './screens/registro/ClienteRegistroScreen';

const ClienteRouter = () => {
    return (
        <ClienteState>
            <Switch>
                <Route path={"/login"} component={ClienteLoginScreen} />
                <Route path={"/registro"} component={ClienteRegistroScreen} />
                <Route path={"/productos"} component={ClienteProductoScreen} />
                <Route path={"/carrito"} component={ClienteCarritoScreen} />
                <Route path={"/"} exact component={ClienteIndexScreen} />
            </Switch>
        </ClienteState>
    )
}

export default ClienteRouter;
