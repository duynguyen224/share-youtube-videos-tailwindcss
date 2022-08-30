import { useContext, useEffect, useRef, useState } from "react";
import { AppContext } from "../constants/AppContext";

function useVisible() {
    const ref = useRef();
    const [open, setOpen] = useState(false);

    const {appContext, appCallback} = useContext(AppContext);

    useEffect(() => {
        /**
         * Alert if clicked on outside of element
         */
        function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
                setOpen(false);
                appCallback.hideShare();
                appCallback.hideLogin();
            }
        }
        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref]);

    return { ref, open, setOpen };
}

export default useVisible;
