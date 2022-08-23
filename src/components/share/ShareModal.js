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
                <Box sx={dialogTitleStyles}>
                    <DialogTitle sx={{ fontWeight: "bold" }}>
                        Share video to the world !
                    </DialogTitle>
                    <CloseIcon
                        sx={{ marginRight: 2, cursor: "pointer" }}
                        onClick={handleClose}
                    />
                </Box>
                <Divider />
                <DialogContent>
                    <Box
                        sx={{
                            position: "relative",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                        }}
                    >
                        <TextField
                            id="outlined-test"
                            label="Enter video link"
                            sx={{ width: "100%" }}
                            placeholder="Example: https://www.youtube.com/watch?v=wsklajasf"
                            onChange={(e) => handleSetSearchUrl(e)}
                        />
                        <Box sx={{ display: error ? "none" : "block" }}>
                            <Button
                                variant="contained"
                                size="small"
                                disableElevation
                                sx={{ height: "40px" }}
                                style={{
                                    borderRadius: 20,
                                    backgroundColor: "rgb(255 82 82)",
                                    padding: "6px 12px",
                                    marginLeft: "5px",
                                    fontSize: "15px",
                                    color: "#fff",
                                }}
                                onClick={async () => {
                                    await handleShareVideo(video);
                                    appCallback.hideShare();
                                    appCallback.reloadData();
                                }}
                            >
                                Share
                            </Button>
                        </Box>
                    </Box>
                    {renderSearchResult()}
                </DialogContent>
            </Dialog>
        </div>
    );
}
