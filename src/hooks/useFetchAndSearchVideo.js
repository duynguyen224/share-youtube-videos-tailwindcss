import { rootShouldForwardProp } from '@mui/material/styles/styled';
import { useEffect, useState } from 'react';
import { getAllCategories } from '../services/categoryService';
import { countVideoByCategoryFilter, countVideoWithoutSearch, countVideoWithSearch, fetchMoreVideoByName, filterVideoByCategory, loadMoreVideoWithoutSearch } from '../services/videoService';


function useFetchAndSearchVideo() {
    // Fetch video
    const [videos, setVideos] = useState([]);
    const [totalVideoCount, setTotalVideoCount] = useState(Number.MAX_VALUE);
    const [hasMoreVideo, setHasMoreVideo] = useState(true);
    const [loading, setLoading] = useState(true);
    
    // Search
    const [searchQuery, setSearchQuery] = useState("");
    const [countSearchResult, setCountSearchResult] = useState(Number.MAX_VALUE);
    const [modeSearching, setModeSearching] = useState(false);
    
    // Category
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState();
    const [countVideoByCategory, setCountVideoByCategory] = useState(Number.MAX_VALUE);
    const [modeFilterCategory, setModeFilterCategory] = useState(false);

    useEffect(() => {
        loadVideosWithoutSearch();
        fetchAllCategories();
    }, [])

    useEffect(() => {
        setLoading(true);
        loadVideoWithSearch(searchQuery);
        let timeout = null;
        setTimeout(() => {
            setLoading(false);
        }, 1500);
    }, [searchQuery])

    useEffect(() => {
        if(videos.length === totalVideoCount || videos.length === countSearchResult){
            setHasMoreVideo(false);
        }
        if(videos.length < countSearchResult){
            setHasMoreVideo(true);
        }
    }, [videos, totalVideoCount, countSearchResult])

    useEffect(() => {
        if(modeSearching === false){
            loadVideosWithoutSearch();
            setCountSearchResult(Number.MAX_VALUE);
        }
    }, [modeSearching])

    useEffect(() => {
        if(videos.length === countVideoByCategory){
            setHasMoreVideo(false);
        }
    }, [countVideoByCategory, videos])

    const loadVideosWithoutSearch = async () => {
        setLoading(true);
        
        const currentVideoLength = 0;
        const res = await loadMoreVideoWithoutSearch(currentVideoLength);
        setVideos(res);

        setTotalVideoCount(await countVideoWithoutSearch());

        setTimeout(() => {
            setLoading(false);
        }, 1500);
    }

    const fetchMoreVideoWithoutSearch = async () => {
        const res = await loadMoreVideoWithoutSearch(videos.length);
        setTimeout(() => {
            setVideos(videos.concat([...res]));
        }, 1500);
    };

    const fetchAllCategories = async () => {
        const res = await getAllCategories();
        setCategories(res);
    }

    const reloadData = async () => {
        setVideos([])

        loadVideosWithoutSearch();

        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 1500);
    }

    const loadVideoWithSearch = async (videoName) => {
        setVideos([]);
        setCountSearchResult(await countVideoWithSearch(videoName));
        const currentCount = 0;
        const result = await fetchMoreVideoByName(videoName, currentCount);
        setVideos(result);
        if(videoName.length > 0) {
            setModeSearching(true);
        }else{
            setModeSearching(false);
        }
    }

    const fetchMoreVideoWithSearch = async () => {
        const result = await fetchMoreVideoByName(searchQuery, 8);
        console.log(result);
        setTimeout(() => {
            setVideos(videos.concat([...result]));
        }, 1500);
        if(searchQuery.length > 0) {
            setModeSearching(true);
        }else{
            setModeSearching(false);
        }
    }

    const handleFilterByCategory = async (item) => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 1500);

        setSelectedCategory(item);
        setModeFilterCategory(true);
        setCountVideoByCategory(await countVideoByCategoryFilter(item));
        const currentCount = 0;
        const response = await filterVideoByCategory(item, currentCount);
        setVideos(response);
    }

    const fetchMoreVideoByCategory = async () => {
        const response = await filterVideoByCategory(selectedCategory , videos.length);
        setTimeout(() => {
            setVideos(videos.concat([...response]));
        }, 1500);
    }

    return {videos, categories, hasMoreVideo, loading, countSearchResult, searchQuery, modeSearching, modeFilterCategory, countVideoByCategory, fetchMoreVideoWithoutSearch, fetchMoreVideoWithSearch, loadVideoWithSearch, reloadData, setSearchQuery, handleFilterByCategory, fetchMoreVideoByCategory};
}

export default useFetchAndSearchVideo;