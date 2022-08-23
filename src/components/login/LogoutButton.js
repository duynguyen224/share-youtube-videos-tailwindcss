import React from "react";
import { GoogleLogout } from "react-google-login";

function LogoutButton() {
    const onLogoutSuccess = () => {
        // localStorage.removeItem("currentUser");
        console.log("Logout success!");
    };

    return (
        <GoogleLogout
            clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
            buttonText={"Logout"}
            onLogoutSuccess={onLogoutSuccess}
        />
    );
}

export default LogoutButton;
