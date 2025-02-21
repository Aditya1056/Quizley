import { useEffect } from "react";

const usePreventRefresh = () => {

    useEffect(() => {

        const handleBeforeUnload = (event) => {
            event.preventDefault();
            event.returnValue = "";
        };

        window.addEventListener("beforeunload", handleBeforeUnload);

        return () => {
            window.removeEventListener("beforeunload", handleBeforeUnload);
        };
  }, []);
};

export default usePreventRefresh;