import React from "react";
import { useState } from "react";

function useShareModal() {
    const [showShareModal, setShowShareModal] = useState(false);

    const showShare = () => {
        setShowShareModal(true);
    };

    const hideShare = () => {
        setShowShareModal(false);
    };

    return { showShareModal, showShare, hideShare };
}

export default useShareModal;
