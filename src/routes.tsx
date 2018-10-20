import React from 'react'

import { Route, Switch } from "react-router-dom";
import { Redirect } from "react-router";

const Page1 = (props: any) => (
    <p>Page 1</p>
);

const Page2 = (props: any) => (
    <p>Page 2</p>
);

const Routes = (props: any) => (
    <Switch>
        <Route exact path="/page1" component={Page1} />
        <Route exact path="/page2" component={Page2} />
        <Route>
            <Redirect to="/page1"/>
        </Route>
    </Switch>
);

export default Routes;