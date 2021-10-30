import { useMainStoreContext } from "../contexts/mainStoreContext";
import { useEffect, useState } from "react";

function useUserProfile(userId) {
    const { userStore } = useMainStoreContext();
    const [isLoading, setIsLoading] = useState(false);
    const [userProfile, setUserProfile] = useState(null);

    useEffect(() => {
        async function loadProfile() {
            setIsLoading(true);
            const profile = await userStore.getUserProfile(userId);
            setUserProfile(profile);

            setIsLoading(false);
        }

        if (userId) {
            loadProfile();
        }
    }, [userStore, userId]);

    return {
        isLoading,
        userProfile,
    };
}

export default useUserProfile;
