import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <div>
            
            <p>
                <Link to="/running">Running</Link>
            </p>
            <p>
                <Link to="/exercise">Exercise</Link>
            </p>
            <p>
                <Link to="/exercisechallenge">맨몸운동 챌린지</Link>
            </p>
            <p>
                <Link to="/runningchallenge">러닝 챌린지</Link>
            </p>
            
            
        </div>
    );
};

export default Navbar;