import React from 'react';
import {Link} from "react-router-dom";

const exercise = () => {
    return (
        <div>
            <p>
                <Link to={"/squat"}>squat</Link>
            </p>
            <p>
                <Link to={"/situp"}>situp</Link>
            </p>
            <p>
                <Link to={"/pushup"}>pushup</Link>
            </p>
        </div>
    );
};

export default exercise;