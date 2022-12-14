import React, { useState } from "react";
import "./App.css";
import Modal from "./components/common/Modal";
import CategoryList from "./components/content/CategoryList";
import Content from "./components/content/Content";
import Header from "./components/header/Header";
import LoginModal from "./components/login/LoginModal";
import ShareModal from "./components/share/ShareModal";
import { AppContext } from "./constants/AppContext";
import useFetchAndSearchVideo from "./hooks/useFetchAndSearchVideo";
import useLoginAction from "./hooks/useLoginAction";
import useLoginModal from "./hooks/useLoginModal";
import useShareModal from "./hooks/useShareModal";
import useVisible from "./hooks/useVisible";

function App() {
    const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem("currentUser")));
    const {showLoginModal, showLogin, hideLogin} = useLoginModal()
    const {showShareModal, showShare, hideShare} = useShareModal();
    const {handleLogin} = useLoginAction();
    const [listVideos, setListVideos] = useState([]);
    const {videos, categories, hasMoreVideo, loading, countSearchResult, modeSearching, searchQuery, modeFilterCategory, countVideoByCategory, setSearchQuery, fetchMoreVideoWithoutSearch, fetchMoreVideoWithSearch, loadVideoWithSearch, reloadData, handleFilterByCategory, fetchMoreVideoByCategory} = useFetchAndSearchVideo();

    return (
        <AppContext.Provider
            value={{
                appContext: {
                    searchQuery: searchQuery,
                    currentUser: currentUser,
                    videos: videos,
                    countSearchResult: countSearchResult,
                    modeSearching: modeSearching,
                    hasMoreVideo: hasMoreVideo,
                    loading: loading, 
                    modeFilterCategory: modeFilterCategory,
                    countVideoByCategory: countVideoByCategory,
                },
                appCallback: {
                    handleLogin: handleLogin,
                    showLogin: showLogin, 
                    hideLogin: hideLogin,
                    showShare: showShare,
                    hideShare: hideShare,
                    fetchMoreVideoWithoutSearch: fetchMoreVideoWithoutSearch,
                    fetchMoreVideoWithSearch: fetchMoreVideoWithSearch,
                    loadVideoWithSearch: loadVideoWithSearch,
                    reloadData: reloadData,
                    handleSearchChange: setSearchQuery,
                    handleFilterByCategory: handleFilterByCategory,
                    fetchMoreVideoByCategory: fetchMoreVideoByCategory,
                },
            }}
        >
            <div className="bg-grayBackground h-screen">
                <Header />
                <div className="container mx-auto">
                    <CategoryList categories={categories}/>
                    <Content videos={videos} />
                </div>
            </div>
            {showLoginModal && <LoginModal />}
            {showShareModal && <ShareModal />}
        </AppContext.Provider>
    );
}

export default App;
