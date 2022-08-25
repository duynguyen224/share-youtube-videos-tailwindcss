import React from "react";

function Divider({text}) {
    return (
        <div className="flex items-center my-1">
            <div className="flex-grow border border-t-1 border-gray-100"></div>
            {text ? <span className="p-2 px-4 bg-gray-100 rounded-full text-sm">{text}</span> : <span></span>}
            <div className="flex-grow border border-t-1 border-gray-100"></div>
        </div>
    )
}

export default Divider;
