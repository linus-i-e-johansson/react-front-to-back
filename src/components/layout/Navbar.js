import React  from 'react';
import {Link} from "react-router-dom";
import propTypes from "prop-types";

const Navbar = ({title, icon}) => {
        return (
            <nav className="navbar bg-primary">
                <h1><i className={icon}></i> {title}</h1>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/About">About</Link>
                    </li>
                </ul>
            </nav>
        );

}

Navbar.defaultProps = {
    icon:"fab fa-github ",
    title:"Github Finder"
}

Navbar.propTypes = {
    title:propTypes.string.isRequired,
    icon: propTypes.string.isRequired
}


export default Navbar;