import { useContext, useEffect, useState } from 'react';
import { YOUTUBE_PREFIX_URL } from "../constants";
import { AppContext } from '../constants/AppContext';
import { addVideo, searchVideo } from "../services/videoService.js";
import { getIdFromYoutubeUrl } from "../utils";

function useShareVideo() {
    const [searchUrl, setSearchUrl] = useState("");
    const [video, setVideo] = useState({});
    const [error, setError] = useState(false);
    const [frameLoading, setFrameLoading] = useState(false);

    const {appContext} = useContext(AppContext);

    useEffect(() => {
        if(searchUrl.length > 0){
            const videoId = getIdFromYoutubeUrl(searchUrl);
            if(videoId === null){
                setError(true);
            }
            if(searchUrl.includes(YOUTUBE_PREFIX_URL)){
                setFrameLoading(true);
                setTimeout(() => {
                    searchVideo(videoId).then((res) => handleSearchVideo(res));
                }, 2000);
            }
        }
    }, [searchUrl]);

    const handleSearchVideo = (response) => {
        if (response.items.length > 0) {
            setVideo(response.items[0]);
            setError(false);
            setFrameLoading(false);
        }else{
            setError(true);
        }
    };

    const handleSetSearchUrl = (e) => {
        setSearchUrl(e.target.value);
    }

    const handleShareVideo = (videoResult) => {
        const videoCreated = addVideo(videoResult, appContext.currentUser);
        return videoCreated;
    }

    return { searchUrl, video, error, frameLoading, handleSearchVideo, handleSetSearchUrl, handleShareVideo }
}

export default useShareVideo