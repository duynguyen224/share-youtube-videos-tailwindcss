import { useEffect, useState } from "react";

function useShareModal() {
    const [showShareModal, setShowShareModal] = useState(false);

    useEffect(() => {
        if (showShareModal) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
    }, [showShareModal]);

    const showShare = () => {
        setShowShareModal(true);
    };

    const hideShare = () => {
        setShowShareModal(false);
    };

    return { showShareModal, showShare, hideShare };
}

export default useShareModal;
