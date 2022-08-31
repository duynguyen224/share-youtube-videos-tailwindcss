import React from "react";

function AppBar({ children }) {
    return <div className="sticky top-0 z-10 bg-white shadow-md">
        {children}
    </div>;
}

export default AppBar;
