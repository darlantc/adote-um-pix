import FirebaseService from "../../services/FirebaseService";
import AuthStore from "../../stores/AuthStore";
import UserRequestStore from "../../stores/UserRequestStore";

jest.mock("../../services/FirebaseService");

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

export function createUserRequestStore({ get, add, update, remove, sampleUserRequest }) {
    const userRequestStore = new UserRequestStore(get, add, update, remove);

    if (sampleUserRequest) {
        userRequestStore.setUserRequests([sampleUserRequest]);
    }

    return userRequestStore;
}

function mockFirebaseService() {
    FirebaseService.prototype.auth = {
        isSignInWithEmailLink: jest.fn(),
        onAuthStateChanged: jest.fn(),
    };

    return new FirebaseService();
}
