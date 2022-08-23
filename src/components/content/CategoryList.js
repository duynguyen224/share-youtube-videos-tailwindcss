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
                <Box sx={{ height: 70, display: "flex", alignItems: "center"}}>
                    <Stack direction="row" spacing={1}>
                        {categories.map((item) => (
                            <Chip
                                label={item.name}
                                key={item.id}
                                variant={ active.id === item.id ? "contained" : "outlined" }
                                onClick={() => {handleClickChip(item)}}
                                sx={{ 
                                    borderRadius: 20,
                                    padding: "5px 5px",
                                    fontSize: "15px",
                                }}
                                style={{
                                    backgroundColor: active.id === item.id ? "rgb(255 82 82)" : "",
                                    color: active.id === item.id ? "#fff" : "#000"
                                }}
                            />
                        ))}
                    </Stack>
                </Box>
                <Divider sx={{ paddingTop: 1 }} />
            </ScrollMenu>
        </React.Fragment>
    );
}

export default CategoryList;
