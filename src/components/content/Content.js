import { Box, Grid } from "@mui/material";
import React, { useContext } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { AppContext } from "../../constants/AppContext";
import Video from "./Video";

function Content(props) {
    const {videos} = props;
    const {appContext, appCallback} = useContext(AppContext);

    const handleFetchMoreData = () => {
        if(appContext.modeSearching){
            appCallback.fetchMoreVideoWithSearch();
        }
        else if (appContext.modeFilterCategory){
            appCallback.fetchMoreVideoByCategory();
        }
        else{
            appCallback.fetchMoreVideoWithoutSearch();
        }
    }

    const renderContent = () => {
        if(videos.length === 0){
            return <h3>No data to display</h3>;
        }
        else{
            return (
                <Box sx={{ flexGrow: 1, my: 2}}>
                    {appContext.modeSearching && !appContext.loading && <Box sx={{fontWeight: "bold"}}>Display {videos.length} of {appContext.countSearchResult} {appContext.countSearchResult > 1 ? "results" : "result"}</Box>}
                    {appContext.modeFilterCategory && !appContext.loading && <Box sx={{fontWeight: "bold"}}>Display {videos.length} of {appContext.countVideoByCategory} {appContext.countVideoByCategory > 1 ? "results" : "result"}</Box>}
                    <InfiniteScroll
                        dataLength={videos.length}
                        next={handleFetchMoreData}
                        hasMore={appContext.hasMoreVideo}
                        loader={<h3 className="font-bold text-center text-lg">Loading ...</h3>}
                    >
                        <Grid
                            container
                            spacing={{ xs: 2, md: 2 }}
                            columns={{ xs: 1, sm: 8, md: 12 }}
                        >
                            {videos.map((item, index) => (
                                <Grid item xs={1} sm={4} md={3} key={index}>
                                    <Video video={item} loading={appContext.loading}/>
                                </Grid>
                            ))}
                        </Grid>
                    </InfiniteScroll>
                </Box>
            );
        }
    }

    return renderContent();
}

export default Content;
