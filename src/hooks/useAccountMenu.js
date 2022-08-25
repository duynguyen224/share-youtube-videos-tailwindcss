import { useEffect, useRef, useState } from "react";

function useAccountMenu() {
    const ref = useRef(null);
    const [openMenu, setOpenMenu] = useState(false);

    useEffect(() => {
        /**
         * Alert if clicked on outside of element
         */
        function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
                setOpenMenu(false);
            }
        }
        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref]);

    return { ref, openMenu, setOpenMenu };
}

export default useAccountMenu;
