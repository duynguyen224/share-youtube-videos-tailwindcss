import { gapi } from "gapi-script";
import { useEffect } from "react";
import { loginUser } from "../services/userService";


function useLoginAction() {
    useEffect(() => {
        // For oAuth2
        function start() {
            gapi.client.init({
                clientId: process.env.REACT_APP_GOOGLE_CLIENT_ID,
                scope: "",
            });
        }
        gapi.load("client:auth2", start);
    }, []);

    const handleLogin = async (userInfo) => {
        // Login with username and password
        if(userInfo.email && userInfo.password){
            const res = await loginUser(userInfo);
            if(res.user){
                localStorage.setItem("accessToken", res.accessToken);
                localStorage.setItem("refreshToken", res.refreshToken);
                localStorage.setItem("currentUser", JSON.stringify(res.user));
                window.location.reload();
            }else{
                alert(res)
            }
        }
        else{
            // Login with oAuth2 google
            const user = await loginUser(userInfo.profileObj);
            localStorage.setItem("currentUser", JSON.stringify(user));
            window.location.reload();
        }
    };

    return { handleLogin };
}

export default useLoginAction;
