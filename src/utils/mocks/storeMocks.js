import FirebaseService from "../../services/FirebaseService";
import AuthStore from "../../stores/AuthStore";

export function createAuthStore({ user }) {
    const firebaseService = mockFirebaseService();
    const authStore = new AuthStore(firebaseService);

    if (user) {
        authStore.setLoggedUserProfile(user);
    }
    return authStore;
}

function mockFirebaseService() {
    // TODO: Melhorar esse teste sem necessidade de criar o FirebaseService
    return new FirebaseService();
}
