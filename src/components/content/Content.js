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
                <div>
                    {appContext.modeSearching && !appContext.loading && <Box sx={{fontWeight: "bold"}}>Display {videos.length} of {appContext.countSearchResult} {appContext.countSearchResult > 1 ? "results" : "result"}</Box>}
                    {appContext.modeFilterCategory && !appContext.loading && <Box sx={{fontWeight: "bold"}}>Display {videos.length} of {appContext.countVideoByCategory} {appContext.countVideoByCategory > 1 ? "results" : "result"}</Box>}
                    <InfiniteScroll
                        dataLength={videos.length}
                        next={handleFetchMoreData}
                        hasMore={appContext.hasMoreVideo}
                        loader={<h3 className="font-bold text-center text-xl">Loading ...</h3>}
                    >
                        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                            {videos.map((item, index) => (
                                <Video video={item} key={index} loading={appContext.loading}/>
                            ))}
                        </div>
                    </InfiniteScroll>
                </div>
            );
        }
    }

    return renderContent();
}

export default Content;
