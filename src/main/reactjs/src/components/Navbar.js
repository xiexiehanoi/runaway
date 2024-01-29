import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <div>
            Main
            <p>
                <Link to="/running">Running</Link>
            </p>
        </div>
    );
};

export default Navbar;