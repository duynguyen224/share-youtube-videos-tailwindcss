import CloseIcon from "@mui/icons-material/Close";
import { Alert, Box, Chip, Divider, Skeleton } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import * as React from "react";
import { AppContext } from "../../constants/AppContext";
import useShareVideo from "../../hooks/useShareVideo";
import { isEmptyObject } from "../../utils";
import YoutubeFrame from "../youtubeFrame/YoutubeFrame";

export default function ShareModal() {
    const { appCallback } = React.useContext(AppContext);
    const {searchUrl, video, error, frameLoading, handleSearchVideo, handleSetSearchUrl, handleShareVideo} = useShareVideo();

    const handleClose = () => {
        appCallback.hideShare();
    };

    const renderSearchResult = () => {
        return (
            <React.Fragment>
                <Divider sx={{ mt: 2, mb: 2 }}>
                    <Chip label="RESULT" />
                </Divider>
                {!isEmptyObject(video) && !error && !frameLoading && <YoutubeFrame video={video} height={"400px"}/>}
                {error && (
                    <Alert severity="error">
                        May be your link is not valid, check it out!
                    </Alert>
                )}
                {frameLoading && <Skeleton animation="wave" variant="rectangle" height={400}/>}
            </React.Fragment>
        );
    };

    const dialogTitleStyles = {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
    };

    return (
        <div>
            <Dialog open={true} onClose={handleClose} fullWidth>
                <div className="flex items-center justify-between">
                    <div className="font-bold text-2xl my-3 ml-6">
                        Share your favorite video !
                    </div>
                    <div 
                        className="mr-5 hover:cursor-pointer hover:bg-red-400 hover:text-white"
                        onClick={handleClose}
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                    </div>
                </div>
                <Divider />
                <DialogContent>
                    <div className="flex items-center ">
                        <input type="email" 
                            placeholder="Example: https://www.youtube.com/watch?v=4sosXZsdy-s"
                            className="h-12 w-full px-3 border border-rose-100 rounded-md my-3 hover:border-rose-300 focus:outline-none focus:border-rose-300 focus:text-lg"
                            onChange={(e) => handleSetSearchUrl(e)}
                        />
                        <button className="h-11 ml-2 px-2 rounded-md text-white uppercase text-lg bg-gradient-to-r from-rose-400 to-red-600 hover:shadow-md focus:outline-red-500"
                            onClick={async () => {
                                await handleShareVideo(video);
                                appCallback.hideShare();
                                appCallback.reloadData();
                            }}
                        >
                            Share
                        </button>
                    </div>
                    {renderSearchResult()}
                </DialogContent>
            </Dialog>
        </div>
    );
}
