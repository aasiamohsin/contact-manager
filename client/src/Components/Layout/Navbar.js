import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export const Navbar = ({ title, icon }) => {
    return (
        <div className="nav-bar">
            <h2>
                <i className={icon}/> {title}
            </h2>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                    <Link to="/about">About</Link>
                </li>
            </ul>
        </div>
    );
}

Navbar.defaultProps = {
    title: 'Contact Manager',
    icon: 'fas fa-id-card-alt'
}

Navbar.propTypes = {
    title: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired
}
