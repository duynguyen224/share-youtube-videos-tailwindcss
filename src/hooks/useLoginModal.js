import React from "react";
import { useState } from "react";

function useLoginModal() {
    const [showLoginModal, setShowLoginModal] = useState(false);

    const showLogin = () => {
        setShowLoginModal(true);
    };

    const hideLogin = () => {
        setShowLoginModal(false);
    };

    return {showLoginModal, showLogin, hideLogin}
}

export default useLoginModal;
