import FirebaseService from "../../services/FirebaseService";
import AuthStore from "../../stores/AuthStore";

export function createAuthStore({ user, needEmail }) {
    const firebaseService = mockFirebaseService();
    const authStore = new AuthStore(firebaseService);

    if (user) {
        authStore.setLoggedUserProfile(user);
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
