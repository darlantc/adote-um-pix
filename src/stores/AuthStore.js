import { makeObservable, observable, action, computed } from "mobx";

import LoginStatus from "../models/LoginStatus";

const LOCAL_STORAGE_KEY = "emailForSignIn";

class AuthStore {
    loggedUser = null;
    errorMessage = null;

    constructor(firebaseService) {
        this.firebaseService = firebaseService;
        makeObservable(this, {
            loggedUser: observable,
            errorMessage: observable,
            setLoggedUser: action,
            setErrorMessage: action,
            uid: computed,
            loginStatus: computed,
        });
        firebaseService.auth.onAuthStateChanged(this.setLoggedUser);

        this.verifyLoginStatus();
    }

    get uid() {
        if (this.loggedUser) {
            return this.loggedUser.uid;
        }
        return null;
    }

    get loginStatus() {
        if (!this.loggedUser) {
            return LoginStatus.loading;
        }
        if (this.loggedUser.isAnonymous()) {
            return LoginStatus.anonymous;
        }
        return LoginStatus.online;
    }

    setLoggedUser = (user) => {
        // User pode ser null | objeto user do Firebase
        this.loggedUser = user;
    };

    setErrorMessage = (value) => {
        this.errorMessage = value;
    };

    verifyLoginStatus = async () => {
        const isSigningByEmail = await this.confirmEmailSignIn();
        if (!isSigningByEmail) {
            if (!this.loggedUser) {
                await this.signInAnonymously();
            }
        }
    };

    signInAnonymously = () => {
        return this.firebaseService.auth.signInAnonymously();
    };

    configSignInEmail = () => {
        return {
            url: window.location.origin,
            handleCodeInApp: true,
        };
    };

    sendSignInLinkToEmail = async (email) => {
        try {
            await this.firebaseService.auth.sendSignInLinkToEmail(email, this.configSignInEmail());

            localStorage.setItem(LOCAL_STORAGE_KEY, email);
        } catch (error) {
            this.setErrorMessage(error.message);
        }
    };

    authenticateUserWithEmail = async (email) => {
        const credential = this.firebaseService.authParam.EmailAuthProvider.credentialWithLink(
            email,
            window.location.href
        );
        try {
            await this.firebaseService.auth.currentUser.linkWithCredential(credential);
        } catch (error) {
            this.setErrorMessage(error.message);
        }
    };

    confirmEmailSignIn = async () => {
        const href = window.location.href;
        if (!this.firebaseService.auth.isSignInWithEmailLink(href)) {
            return false;
        }

        let email = window.localStorage.getItem(LOCAL_STORAGE_KEY);
        if (!email) {
            email = window.prompt("Please provide your email for confirmation");
        }

        try {
            await this.firebaseService.auth.signInWithEmailLink(email, href);
            window.localStorage.removeItem(LOCAL_STORAGE_KEY);
        } catch (error) {
            this.setErrorMessage(error.message);
        } finally {
            return true;
        }
    };

    updateUser = async (userId, name, bio, linkedIn) => {
        try {
            await this.firebaseService.usersRef.child(userId).set({
                name,
                bio,
                linkedIn,
            });
            console.log("success");
        } catch (error) {
            console.log("error on editing", error);
        }
    };

    logout = async () => {
        try {
            await this.firebaseService.auth.signOut();
            await this.signInAnonymously();
        } catch (error) {
            this.logout();
        }
    };
}

export default AuthStore;
