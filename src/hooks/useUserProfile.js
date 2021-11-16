import { useMainStoreContext } from "../contexts/mainStoreContext";
import { useEffect, useState } from "react";

function useUserProfile(userId) {
    const { userStore } = useMainStoreContext();
    const [isLoading, setIsLoading] = useState(false);
    console.log("🚀 ~ file: useUserProfile.js ~ line 7 ~ useUserProfile ~ isLoading", isLoading)
    const [userProfile, setUserProfile] = useState(null);
    console.log("🚀 ~ file: useUserProfile.js ~ line 8 ~ useUserProfile ~ userProfile", userProfile)

    useEffect(() => {
        async function loadProfile() {
            setIsLoading(true);
            const profile = await userStore.getUserProfile(userId);
            setUserProfile(profile);

            setIsLoading(false);
            console.log("🚀 ~ file: useUserProfile.js ~ line 18 ~ loadProfile ~ setIsLoading")
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
