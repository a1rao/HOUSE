import React from "react";
import { Route, Redirect } from "react-router-dom";

/**
 * Make home page "/" a private route meaning only users who are logged in can be directed to home
 * Otherwise direct to login page "/login"
 */
export default function PrivateRoute({component: Component, authenticated, ...rest}) {
    return (
        <Route
            {...rest}
            render={props =>
                authenticated === true ? (
                    <Component {...props} {...rest} />
                ) : (
                    <Redirect to='/login' />
                )
            }
        />
    );
}