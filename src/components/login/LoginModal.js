import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { AppContext } from "../../constants/AppContext";
import { Box, Chip, Divider, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";
import { useEffect } from "react";
import { gapi } from "gapi-script";

export default function LoginModal() {
    const { appCallback } = React.useContext(AppContext);

    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    const handleClickLogin = () => {
        const loginInfo = {
            email: email,
            password: password,
        };
        if(email === "" || password === ""){
            alert("Please enter both your email and password");
            return;
        }
        appCallback.handleLogin(loginInfo);
    };

    const handleClose = () => {
        appCallback.hideLogin();
    };

    const dialogTitleStyles = {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
    };

    return (
        <div>
            <Dialog open={true} onClose={handleClose} fullWidth>
                <div className="bg-gradient-to-r from-rose-50 to-red-100 ">
                    <div className="flex items-center justify-between">
                        <div className="font-bold text-2xl my-3 ml-6">
                            Log in or sign up
                        </div>
                        <div 
                            className="mr-5 hover:cursor-pointer hover:bg-red-400 hover:text-white"
                            onClick={handleClose}
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                        </div>
                    </div>
                    <Divider />
                    <DialogContent>
                        <div>
                            <div className="text-black text-xl">
                                Welcome to Youtube Sharing
                            </div>
                            <input type="email" placeholder="Enter your email"
                                className="h-12 w-full px-3 border border-rose-100 rounded-md my-3 hover:border-rose-300 focus:outline-none focus:border-rose-300 focus:text-lg"
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                }}
                            />
                            <input type="password" placeholder="Enter your password"
                                className="h-12 w-full px-3 border border-rose-100 rounded-md my-3 hover:border-rose-300 focus:outline-none focus:border-rose-300  focus:text-lg"
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                }}
                            />
                            <button className="h-12 w-full rounded-md text-white uppercase text-lg my-6 mt-3 bg-gradient-to-r from-rose-400 to-red-600 hover:shadow-md focus:outline-red-500"
                                onClick={handleClickLogin}
                            >
                                Login
                            </button>
                        </div>
                        <Divider sx={{marginBottom: 2}}>
                            <Chip label="OR" />
                        </Divider>
                        <div className="flex justify-center">
                            <LoginButton />
                        </div>
                    </DialogContent>
                </div>
            </Dialog>
        </div>
    );
}
