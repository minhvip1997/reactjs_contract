import React from 'react';
import { Link } from 'react-router-dom';
import './Nav.css';

function Nav(props) {
    return (
        <div className="topnav">
            <Link  to="/" >Home</Link>
            <Link to="/employee">Employee</Link>
            <Link to="/contract">Contact</Link>
            <Link to="/contract/all">All Contract</Link>
            <Link to="/attribute">All Attribute</Link>
            <Link to="/allpet">All Pet</Link>
        </div>
    );
}

export default Nav;