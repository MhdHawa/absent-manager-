import React, {  Suspense } from "react";
import Home from "../components/home/Home";
import {Route,Switch} from "react-router-dom";



const Routes = () => {

    return (
        <Suspense>
            <Switch>
                <Route path="/" exact component={Home} />
            </Switch>
        </Suspense>
    )
}

export default Routes
