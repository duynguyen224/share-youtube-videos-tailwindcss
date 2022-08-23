import React, { useContext } from "react";
import { GoogleLogin } from "react-google-login";
import { AppContext } from "../../constants/AppContext";

function LoginButton() {
    const {appCallback} = useContext(AppContext);

    const onSuccess = (res) => {
        appCallback.handleLogin(res);
    }

    const onFailure = (res) => {
        alert("Login failed");
    }

    return <GoogleLogin 
        clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
        buttonText="Login with Google"
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={'single_host_origin'}
        isSignedIn={false}
    />
}

export default LoginButton;
