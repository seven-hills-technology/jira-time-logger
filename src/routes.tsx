import React from 'react'

import { Route, Switch } from "react-router-dom";
import { Redirect } from "react-router";

import MainPage from "./containers/mainPage"


const Routes = (props: any) => (
    <Switch>
        <Route exact path="/main" component={MainPage} />
        <Route>
            <Redirect to="/main"/>
        </Route>
    </Switch>
);

export default Routes;