import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import React, { useContext, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu';
import { AppContext } from "../../constants/AppContext";

function CategoryList(props) {
    const {appCallback} = useContext(AppContext);

    const { categories } = props;
    
    const [active, setActive] = useState({ id: "" });

    const handleClickChip = (item) => {
        setActive({ id: item.id });
        // appCallback.getVideoByCategory(item);
        appCallback.handleFilterByCategory(item);
    }

    return (
        <React.Fragment>
            <ScrollMenu LeftArrow={"<"} RightArrow={">"}>
                <div className="flex my-6 space-x-2">
                    {categories.map((item, index) => (
                        <div key={index}
                            className={`border border-gray-400 rounded-full p-1 px-2 hover:cursor-pointer ${active.id === item.id ? 'bg-red-500 text-white outline-none' : ''}`}
                            onClick={() => {handleClickChip(item)}}
                        >
                            {item.name}
                        </div>
                    ))}
                </div>
                <Divider sx={{ paddingTop: 1 }} />
            </ScrollMenu>
        </React.Fragment>
    );
}

export default CategoryList;
