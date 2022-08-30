import { Alert, Skeleton } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import * as React from "react";
import { AppContext } from "../../constants/AppContext";
import useShareVideo from "../../hooks/useShareVideo";
import useVisible from "../../hooks/useVisible";
import { isEmptyObject } from "../../utils";
import Divider from "../common/Divider";
import Modal from "../common/Modal";
import YoutubeFrame from "../youtubeFrame/YoutubeFrame";

export default function ShareModal() {
    const { appCallback } = React.useContext(AppContext);
    const {searchUrl, video, error, frameLoading, handleSearchVideo, handleSetSearchUrl, handleShareVideo} = useShareVideo();

    const {ref, open, setOpen} = useVisible();

    const handleClose = () => {
        appCallback.hideShare();
    };

    const renderSearchResult = () => {
        return (
            <React.Fragment>
                <Divider text="RESULT"/>
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
        <Modal>
            <div className="mx-3" ref={ref}>
                <div className="flex items-center justify-between">
                    <div className="font-semibold text-xl my-3">
                        Share your favorite video !
                    </div>
                    <div 
                        className="hover:cursor-pointer hover:bg-red-400 hover:text-white"
                        onClick={handleClose}
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                    </div>
                </div>
                <Divider />
                <div className="mb-3">
                    <div className="flex items-center ">
                        <input type="email" 
                            placeholder="Example: https://www.youtube.com/watch?v=4sosXZsdy-s"
                            className="h-11 w-full px-3 border-2 border-gray-200 rounded-md my-3 hover:border-blue-300 hover:border-2 focus:border-2 focus:outline-none focus:border-blue-300 focus:text-lg placeholder:italic"
                            onChange={(e) => handleSetSearchUrl(e)}
                        />
                        <button className="h-10 ml-2 px-3 rounded-md text-white text-lg bg-gradient-to-r from-rose-400 to-red-500"
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
                </div>
            </div>
        </Modal>
    );
}
