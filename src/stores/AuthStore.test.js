import FirebaseService from "../services/FirebaseService";
import AuthStore from "./AuthStore";
import { mockFirebaseService } from "../utils/mocks/storeMocks";

jest.mock("../services/FirebaseService");

beforeEach(() => {
    // Clear all instances and calls to constructor and all methods:
    FirebaseService.mockClear();
    localStorage.clear();
});

describe("AuthStore", () => {
    describe("verifyLoginStatus", () => {
        it("should call isSignInWithEmailLink and onAuthStateChanged from firebase auth", async () => {
            const isSignInWithEmailLink = jest.fn(() => {
                return false;
            });
            const onAuthStateChanged = jest.fn();

            createSUT({ isSignInWithEmailLink, onAuthStateChanged });
            expect(isSignInWithEmailLink).toBeCalledTimes(1);

            await flushPromises();
            expect(onAuthStateChanged).toBeCalledTimes(1);
        });

        it("should call only isSignInWithEmailLink if localStorage have a email firebase auth", async () => {
            const isSignInWithEmailLink = jest.fn(() => {
                return true;
            });
            const onAuthStateChanged = jest.fn();
            const signInWithEmailLink = jest.fn();

            localStorage.setItem("emailForSignIn", "email@test.com");

            createSUT({ isSignInWithEmailLink, onAuthStateChanged, signInWithEmailLink });
            expect(isSignInWithEmailLink).toBeCalledTimes(1);
            expect(signInWithEmailLink).toBeCalledTimes(1);

            await flushPromises();
            expect(onAuthStateChanged).not.toBeCalled();
        });

        it("should call signInAnonymously if onAuthStateChanged does not return user", async () => {
            const isSignInWithEmailLink = jest.fn(() => {
                return false;
            });
            const signInAnonymously = jest.fn();
            const onAuthStateChanged = jest.fn(() => {
                signInAnonymously();
            });

            createSUT({ isSignInWithEmailLink, onAuthStateChanged });
            expect(isSignInWithEmailLink).toBeCalledTimes(1);

            await flushPromises();
            expect(signInAnonymously).toBeCalledTimes(1);
        });
    });
});

function createSUT({ isSignInWithEmailLink, onAuthStateChanged, signInWithEmailLink }) {
    const firebaseService = mockFirebaseService({
        isSignInWithEmailLink,
        onAuthStateChanged,
        signInWithEmailLink,
    });
    return new AuthStore(firebaseService);
}

// hack to flush immediately all promises to test the result
// https://stackoverflow.com/questions/44741102/how-to-make-jest-wait-for-all-asynchronous-code-to-finish-execution-before-expec
// https://developer.mozilla.org/en-US/docs/Web/API/Window/setImmediate
const flushPromises = () => new Promise(setImmediate);
