export const loginUser = async (userInfo) => {
    const response = await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/v1/auth/login`, {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(userInfo),
    });
    return response.json();
};
