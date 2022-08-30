import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import * as React from "react";
import { AppContext } from "../../constants/AppContext";
import useVisible from "../../hooks/useVisible";
import Divider from "../common/Divider";
import Modal from "../common/Modal";
import LoginButton from "./LoginButton";

export default function LoginModal() {
    const { appCallback } = React.useContext(AppContext);

    const {ref, open, setOpen} = useVisible();

    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    const handleClickLogin = () => {
        const loginInfo = {
            email: email,
            password: password,
        };
        if (email === "" || password === "") {
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
        <Modal>
            <div className="mx-4" ref={ref}>
                <div className="flex items-center justify-between">
                    <div className="font-bold text-2xl my-3">
                        Log in or sign up
                    </div>
                    <div
                        className="hover:cursor-pointer hover:bg-red-400 hover:text-white"
                        onClick={handleClose}
                    >
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                stroke-linecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M6 18L18 6M6 6l12 12"
                            ></path>
                        </svg>
                    </div>
                </div>
                <Divider />
                <div>
                    <div className="text-black text-xl">
                        Welcome to Youtube Sharing
                        <br/>
                        <br/>
                        <div className="text-sm">Account: test@gmail.com - 123456</div>
                    </div>
                    <input
                        type="email"
                        placeholder="Enter your email"
                        className="h-12 w-full px-3 border border-rose-100 rounded-md my-3 hover:border-blue-300 focus:outline-none focus:border-blue-300 focus:text-lg"
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                        }}
                    />
                    <input
                        type="password"
                        placeholder="Enter your password"
                        className="h-12 w-full px-3 border border-rose-100 rounded-md my-3 hover:border-blue-300 focus:outline-none focus:border-blue-300  focus:text-lg"
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }}
                    />
                    <button
                        className="h-12 w-full rounded-md text-white uppercase text-lg my-6 mb-3 mt-3 bg-gradient-to-r from-rose-400 to-red-600 hover:shadow-md focus:outline-red-500"
                        onClick={handleClickLogin}
                    >
                        Login
                    </button>
                </div>
                <Divider text="OR" />
                <div className="flex justify-center mt-1 mb-4">
                    <LoginButton />
                </div>
            </div>
        </Modal>
    );
}
