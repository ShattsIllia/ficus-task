import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../../assets/img/logo.png';
import { isAuthorized } from '../../helpers/index';
import './styles.scss';

const Navigation = () => {  
    return (
        <div className="nav">
            <div className="nav-logo">
              <NavLink to="/"><img src={logo} alt="logo"></img></NavLink>        
            </div>
            <div className="nav-items__wrapper">
                <NavLink className="nav-item" to="/">Home</NavLink>
                {isAuthorized() ? null : <NavLink className="nav-item" to="/signin">Sign In</NavLink>}
                {isAuthorized() ? null : <NavLink className="nav-item" to="/signup">Sign Up</NavLink>}
                {!isAuthorized() ? null : <NavLink className="nav-item" to="/newpost">Create New Post</NavLink> }
                {!isAuthorized() ? null : <NavLink className="nav-item" to="/signout">Sign Out</NavLink>}
                <NavLink className="nav-item" to="/users">Users</NavLink>
                <NavLink className="nav-item" to="/postwaypoint">WayPoint</NavLink>
                {!isAuthorized() ? null : <NavLink className="nav-item" to="/settings">Settings</NavLink>}
            </div>
        </div>
    )
}

export default Navigation;