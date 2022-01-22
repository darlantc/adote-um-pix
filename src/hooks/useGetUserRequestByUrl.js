import { useMainStoreContext } from "../contexts/mainStoreContext";
import { useEffect, useState } from "react";

function useGetUserRequestByUrl(url) {
    const { userRequestStore } = useMainStoreContext();

    const [isLoading, setIsLoading] = useState(false);
    const [request, setRequest] = useState(null);

    useEffect(() => {
        async function loadRequest() {
            setIsLoading(true);
            const request = await userRequestStore.getSpecificUserRequest(url);
            if (request) {
                setRequest(request);
            }
            setIsLoading(false);
        }

        if (url) {
            loadRequest();
        }
    }, [url, userRequestStore]);

    return {
        isLoading,
        request,
    };
}

export default useGetUserRequestByUrl;
