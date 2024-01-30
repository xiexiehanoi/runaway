import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <div>
            Main
            <p>
                <Link to="/running">Running</Link>
            </p>
            <p>
                <Link to="/my">mypage</Link>
            </p>
            <p>
                <Link to="/login">로그인 페이지</Link>
            </p>
        </div>
    );
};

export default Navbar;