import React from 'react';
import {Link} from "react-router-dom";

function Main() {
    return (
        <div>
            Main
            <p>
                <Link to="/running">Running</Link>
            </p>
        </div>
    );
}

export default Main;