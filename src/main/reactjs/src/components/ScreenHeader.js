
import React from "react";

const ScreenHeader = ({title}) => {

    return (
        <div className="header-in-screen">
            <span style={{ marginLeft: "8%" }}>{title}</span>
        </div>
    );
}

export default ScreenHeader;