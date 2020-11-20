import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ClienteRouter from './modules/cliente/ClienteRouter';

const AppRouter = () => {
    return (
        <Router>
            <Switch>
                <Route path={"/"} component={ClienteRouter} />
            </Switch>
        </Router>
    )
}

export default AppRouter
