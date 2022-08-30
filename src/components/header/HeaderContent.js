import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../constants/AppContext";
import AccountMenu from "./AccountMenu";

function HeaderContent() {
    let navigate = useNavigate();
 
    const { appContext, appCallback } = useContext(AppContext);
   
    const showShareModal = () => {
        appCallback.showShare();
        appCallback.setOpen(true);
    }

    const handleSearch = (e) => { 
        appCallback.handleSearchChange(e.target.value);
    }

    return (
        <React.Fragment>
            <div className='flex justify-between items-center'>
                <a href="/">
                    <img
                        src="YouTube_Logo_2017.svg"
                        style={{ height: "30px" }}
                    />
                </a>
                <div className="hidden relative w-80 text-black hover:cursor-pointer md:block">
                    <div className="absolute text-gray-400 top-1/2 left-1 transform -translate-y-1/2">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                    </div>
                    <input className="bg-stone-100 p-2 px-6 pl-10 w-full focus:outline-none"
                        placeholder='Type here to search'
                        onChange={handleSearch}
                        value={appContext.searchQuery}
                    />
                </div>
                <div className="block md:hidden text-black">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                </div>
                <div className='flex justify-center'>
                    {appContext.currentUser && (
                        <button className="h-11 w-full rounded-md text-white uppercase text-md my-2 px-2 bg-gradient-to-r from-red-400 to-red-600 hover:shadow-md focus:outline-red-500"
                        onClick={showShareModal}
                        >
                            Share video
                        </button>
                    )}
                    <AccountMenu />
                </div>
            </div>
        </React.Fragment>
    );
}

export default HeaderContent;
