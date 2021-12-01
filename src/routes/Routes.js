import React, {  Suspense } from "react";
import Home from "../components/home/Home";
import {Route,Switch} from "react-router-dom";
import Loader from "../components/layout/loader/Loader";



const Routes = () => {

    return (
        <Suspense fallback={<Loader />}>
            <Switch>
                <Route path="/" exact component={Home} />
            </Switch>
        </Suspense>
    )
}

export default Routes
