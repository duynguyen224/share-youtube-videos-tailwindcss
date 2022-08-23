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
                <Box sx={dialogTitleStyles}>
                    <DialogTitle sx={{ fontWeight: "bold" }}>
                        Log in or sign up
                    </DialogTitle>
                    <CloseIcon
                        sx={{ marginRight: 2, cursor: "pointer" }}
                        onClick={handleClose}
                    />
                </Box>
                <Divider />
                <DialogContent>
                    <Box sx={{ "& .MuiTextField-root": { mb: 2 } }}>
                        <Typography variant="h6" gutterBottom component="div">
                            <Box sx={{ fontWeight: "500" }}>
                                Welcome to Youtube Sharing
                            </Box>
                        </Typography>
                        <TextField
                            id="outlined-email"
                            type="email"
                            label="Email"
                            fullWidth
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value);
                            }}
                        />
                        <TextField
                            id="outlined-password"
                            label="Password"
                            type="password"
                            fullWidth
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value);
                            }}
                        />
                        <Button
                            variant="contained"
                            fullWidth
                            sx={{ mb: 2 }}
                            style={{
                                borderRadius: 25,
                                backgroundColor: "rgb(255 82 82)",
                                padding: "10px 20px",
                                fontSize: "15px",
                                color: "#fff",
                            }}
                            onClick={handleClickLogin}
                        >
                            Login
                        </Button>
                    </Box>
                    <Divider>
                        <Chip label="OR" />
                    </Divider>
                    <Box sx={{ display: "flex", justifyContent: "center" }}>
                        <LoginButton />
                        {/* <LogoutButton/> */}
                    </Box>
                </DialogContent>
            </Dialog>
        </div>
    );
}
