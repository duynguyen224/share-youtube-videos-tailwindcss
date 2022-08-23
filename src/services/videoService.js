export const countVideoWithoutSearch = async () => {
    const response = await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/v1/videos/count`);
    return response.json();
}

export const countVideoWithSearch = async (searchQuery) => {
    const response = await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/v1/videos/count-with-search?search=${searchQuery}`);
    return response.json();
}

export const loadMoreVideoWithoutSearch = async (currentCount) => {
    const response = await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/v1/videos/get-more-videos?currentCount=${currentCount}`);
    return response.json();
}

export const searchVideo = async (videoId) => {
    const response = await fetch(`https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${process.env.REACT_APP_GOOGLE_API_KEY}`);
    return response.json();
};

export const getAllVideos = async () => {
    const response = await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/v1/videos`);
    return response.json();
}

export const addVideo = async (videoResult, currentUser) => {
    const response = await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/v1/videos/create-video`, {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({video: videoResult, user: currentUser}),
    });
    return response.json();
};

export const searchVideoByName = async (searchStr) => {
    const response = await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/v1/videos/search-video?search=${searchStr}`);
    return response.json();
}

export const fetchMoreVideoByName = async (searchStr, currentCount) => {
    const response = await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/v1/videos/get-more-with-search?search=${searchStr}&currentCount=${currentCount}`);
    return response.json();
}

export const countVideoByCategoryFilter = async (category) => {
    const response = await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/v1/videos/count-by-category?categoryId=${category.id}`);
    return response.json();
}

export const filterVideoByCategory = async (category, currentCount) => {
    const response = await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/v1/videos/filter-by-category?categoryId=${category.id}&currentCount=${currentCount}`);    
    return response.json();
}