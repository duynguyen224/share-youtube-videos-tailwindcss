import * as React from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import useAccountMenu from "../../hooks/useAccountMenu";
import { AppContext } from "../../constants/AppContext";

export default function AccountMenu() {
    const {anchorEl , open, handleClick, handleClose} = useAccountMenu();
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

    const renderGuestMenuItems = () => {
        return (
            <MenuItem onClick={handleOpenLoginModal}>
                <Avatar />
                Login
            </MenuItem>
        );
    };

    const renderUserMenuItems = () => {
        return [
            <MenuItem key={1}>
                <Avatar/> My account
            </MenuItem>,
            <Divider key={2} />,
            <MenuItem onClick={handleLogout} key={3}>
                <ListItemIcon>
                    <Logout fontSize="small" />
                </ListItemIcon>
                Logout
            </MenuItem>,
        ];
    };

    return (
        <React.Fragment>
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    textAlign: "center",
                }}
            >
                <Tooltip title="Account settings">
                    <IconButton
                        onClick={handleClick}
                        size="small"
                        sx={{ ml: 2 }}
                        aria-controls={open ? "account-menu" : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? "true" : undefined}
                    >
                        {renderAvatar()}
                    </IconButton>
                </Tooltip>
                <Menu
                    anchorEl={anchorEl}
                    id="account-menu"
                    open={open}
                    onClose={handleClose}
                    onClick={handleClose}
                    PaperProps={{
                        elevation: 0,
                        sx: {
                            overflow: "visible",
                            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                            mt: 1.5,
                            "& .MuiAvatar-root": {
                                width: 32,
                                height: 32,
                                ml: -0.5,
                                mr: 1,
                            },
                            "&:before": {
                                content: '""',
                                display: "block",
                                position: "absolute",
                                top: 0,
                                right: 14,
                                width: 10,
                                height: 10,
                                bgcolor: "background.paper",
                                transform: "translateY(-50%) rotate(45deg)",
                                zIndex: 0,
                            },
                        },
                    }}
                    transformOrigin={{ horizontal: "right", vertical: "top" }}
                    anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                >
                    {localStorage.getItem("currentUser")
                        ? renderUserMenuItems()
                        : renderGuestMenuItems()}
                </Menu>
            </Box>
        </React.Fragment>
    );
}
