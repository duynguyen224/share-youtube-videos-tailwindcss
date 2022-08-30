import Avatar from "@mui/material/Avatar";
import * as React from "react";
import { defaultAvatar } from "../../constants";
import { AppContext } from "../../constants/AppContext";
import useVisible from "../../hooks/useVisible";

export default function AccountMenu() {
    const {ref, open, setOpen} = useVisible();
    const {appContext, appCallback} = React.useContext(AppContext)
  
    const renderAvatar = () => {
        return localStorage.getItem("currentUser") ? <Avatar src={appContext.currentUser.imageUrl}></Avatar> : <Avatar/>
    }

    const handleOpenLoginModal = () => {
        appCallback.showLogin();
    }

    const handleLogout = () => {
        localStorage.removeItem("currentUser");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("accessToken");
        window.location.reload();
    };

    const handleOpenMenu = () => {
        setOpen(!open);
    }

    const renderUserMenu = () => {
        return (
            <>
                <div className="flex items-center p-3 border-b-2 hover:bg-gray-200">
                    <span className="mr-2">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    </span>
                        My account
                </div>
                <div className="flex items-center p-3 border-b-2 hover:bg-gray-200" 
                    onClick={handleLogout}
                >
                    <span className="mr-2">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
                    </span>
                    Log out
                </div>
            </>)
    }

    const renderGuestMenu = () => {
        return (
            <div className="flex items-center p-3 hover:bg-gray-200" 
                onClick={handleOpenLoginModal}
            >
                <span className="mr-2">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"></path></svg>
                </span>
                Log in
            </div>
        )
    }

    return (
        <div className="flex relative items-center text-black hover:cursor-pointer" 
            onClick={handleOpenMenu}
        >
            <div className="py-2">
                <img className="w-14 ml-2 rounded-full" src={localStorage.getItem("currentUser") ? appContext.currentUser.imageUrl : defaultAvatar}/>
            </div>
            {open && 
                <div className="absolute top-16 -left-4 w-36 mt-1 bg-white shadow-lg" ref={ref}>
                    {localStorage.getItem("currentUser") ? renderUserMenu() : renderGuestMenu()}
                </div>
            }
        </div>
    );
}
