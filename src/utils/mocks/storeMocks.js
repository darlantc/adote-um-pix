import FirebaseService from "../../services/FirebaseService";
import AuthStore from "../../stores/AuthStore";
import InternalEventsStore from "../../stores/InternalEventsStore";
import UserRequestStore from "../../stores/UserRequestStore";

jest.mock("../../services/FirebaseService");

export function createAuthStore({
    user,
    userProfile,
    needEmail,
    displayEmailRedirectOptions,
    isSignInWithEmailLink,
    signInWithEmailLink,
    internalEventsStore,
}) {
    const firebaseService = mockFirebaseService({ isSignInWithEmailLink, signInWithEmailLink });
    const internalEvents = internalEventsStore || createInternalEventsStore();
    const authStore = new AuthStore(internalEvents, firebaseService);

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

export function createInternalEventsStore() {
    const internalEventsStore = new InternalEventsStore();

    return internalEventsStore;
}

export function createUserRequestStore({
    get = jest.fn(),
    add = jest.fn(),
    update = jest.fn(),
    remove = jest.fn(),
    sampleUserRequest,
}) {
    const userRequestStore = new UserRequestStore(get, add, update, remove);

    if (sampleUserRequest) {
        userRequestStore.setUserRequests([sampleUserRequest]);
    }

    return userRequestStore;
}

export function mockFirebaseService(props) {
    FirebaseService.prototype.auth = {
        isSignInWithEmailLink: props?.isSignInWithEmailLink || jest.fn(),
        onAuthStateChanged: props?.onAuthStateChanged || jest.fn(),
        signInWithEmailLink: props?.signInWithEmailLink || jest.fn(),
        signInAnonymously: props?.signInAnonymously || jest.fn(),
    };
    return new FirebaseService();
}
