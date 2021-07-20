import FirebaseService from "../../services/FirebaseService";
import AuthStore from "../../stores/AuthStore";

export function createAuthStore({ user, userProfile, needEmail, displayEmailRedirectOptions }) {
    const firebaseService = mockFirebaseService();
    const authStore = new AuthStore(firebaseService);

    if (user) {
        authStore.setLoggedUser(user);
    }

    if (displayEmailRedirectOptions) {
        authStore.setDisplayEmailRedirectOptions(displayEmailRedirectOptions);
    }

    if (userProfile) {
        authStore.setLoggedUserProfile(userProfile);
    }

    if (needEmail) {
        authStore.setNeedEmailForSignIn(true);
    }

    return authStore;
}

function mockFirebaseService() {
    // TODO: Melhorar esse teste sem necessidade de criar o FirebaseService
    return new FirebaseService();
}
