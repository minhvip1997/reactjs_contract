import React from 'react';
import { Link } from 'react-router-dom';
import './Nav.css';

function Nav(props) {
    return (
        <div className="topnav">
            <Link activeClassName="active" to="/" exact={true}>Home</Link>
            <Link to="/employee">Employee</Link>
            <Link to="/contract">Contact</Link>
            <Link to="/about">About</Link>
        </div>
    );
}

export default Nav;