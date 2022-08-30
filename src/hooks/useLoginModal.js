import { useEffect, useState } from "react";

function useLoginModal() {
    const [showLoginModal, setShowLoginModal] = useState(false);

    useEffect(() => {
        if (showLoginModal) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
    }, [showLoginModal]);

    const showLogin = () => {
        setShowLoginModal(true);
    };

    const hideLogin = () => {
        setShowLoginModal(false);
    };

    return { showLoginModal, showLogin, hideLogin };
}

export default useLoginModal;
