import React, { useEffect, useState } from "react";

function Modal({ children }) {
    return (
        <React.Fragment>
            <div className="absolute bg-gray-600 opacity-50 w-screen h-screen top-0 left-0"></div>
            <div className={`absolute bg-white top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2/3 min-h-1/2 shadow-2xl overflow-x-hidden md:w-1/2 lg:w-1/3`}>{children}</div>
        </React.Fragment>
    );
}

export default Modal;
