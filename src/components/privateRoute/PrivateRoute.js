import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { isAuthorized } from '../../helpers';


export const PrivateRoute = ({component: Component, ...rest}) => { 
    return(
        <Route
            {...rest}
            render={props => {
                return isAuthorized ? (
                    <Component {...props} />
                ) : (
                    <Redirect to={"/signin"}/>
                );
            }}
        />
    );
};