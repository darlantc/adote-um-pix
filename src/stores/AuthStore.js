import { makeObservable, observable, action, computed, reaction } from "mobx";

import LoginStatus from "../models/LoginStatus";

const LOCAL_STORAGE_KEY = "emailForSignIn";

class AuthStore {
    loggedUserProfile = null;
    loggedUser = null;
    errorMessage = null;
    displayEmailRedirectOptions = false;
    needEmailForSignIn = false;

    #loggedUserRef = null;

    constructor(firebaseService) {
        this.firebaseService = firebaseService;
        makeObservable(this, {
            loggedUserProfile: observable,
            loggedUser: observable,
            errorMessage: observable,
            displayEmailRedirectOptions: observable,
            needEmailForSignIn: observable,
            setLoggedUserProfile: action,
            setLoggedUser: action,
            setErrorMessage: action,
            setDisplayEmailRedirectOptions: action,
            setNeedEmailForSignIn: action,
            uid: computed,
            loginStatus: computed,
            isAuthenticated: computed,
            isAnonymous: computed,
        });

        this.verifyLoginStatus();
        reaction(
            () => this.isAuthenticated && !this.isAnonymous,
            (hasProfile) => {
                this.clearLoggedUserProfile();
                if (hasProfile) {
                    this.#loggedUserRef = this.firebaseService.usersRef?.child(this.uid);

                    this.#loggedUserRef.on("value", (snapshot) => {
                        this.setLoggedUserProfile(snapshot.val());
                    });
                }
            }
        );
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
        if (this.loggedUser.isAnonymous) {
            return LoginStatus.anonymous;
        }
        return LoginStatus.online;
    }

    get isAuthenticated() {
        return this.loggedUser;
    }

    get isAnonymous() {
        return this.loginStatus === LoginStatus.anonymous;
    }

    setNeedEmailForSignIn = (value) => {
        this.needEmailForSignIn = value;
    };

    setLoggedUserProfile = (value) => {
        this.loggedUserProfile = value;
    };

    setLoggedUser = (newValue) => {
        this.loggedUser = newValue;
    };

    setErrorMessage = (value) => {
        this.errorMessage = value;
    };

    setDisplayEmailRedirectOptions = (value) => {
        this.displayEmailRedirectOptions = value;
    };

    verifyLoginStatus = async () => {
        const isNotSigningByEmail = !(await this.confirmEmailSignIn());

        if (isNotSigningByEmail) {
            this.firebaseService.auth.onAuthStateChanged((user) => {
                this.setLoggedUser(user);
                if (!user) {
                    this.signInAnonymously();
                }
            });
        }
    };

    signInAnonymously = () => this.firebaseService.auth.signInAnonymously();

    configSignInEmail = () => {
        return {
            url: window.location.origin,
            handleCodeInApp: true,
        };
    };

    clearLoggedUserProfile = () => {
        if (this.#loggedUserRef) {
            this.#loggedUserRef.off("value");
        }
        this.#loggedUserRef = null;
        this.setLoggedUserProfile(null);
    };

    sendSignInLinkToEmail = async (email) => {
        this.setDisplayEmailRedirectOptions("loading");
        try {
            await this.firebaseService.auth.sendSignInLinkToEmail(email, this.configSignInEmail());

            localStorage.setItem(LOCAL_STORAGE_KEY, email);
            this.setDisplayEmailRedirectOptions(true);
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

    confirmEmailSignIn = async (emailFromUser) => {
        const href = window.location.href;
        if (!this.firebaseService.auth.isSignInWithEmailLink(href)) {
            return false;
        }

        const emailFromStorage = window.localStorage.getItem(LOCAL_STORAGE_KEY);
        const email = emailFromStorage || emailFromUser;

        if (!email) {
            this.setNeedEmailForSignIn(true);
            return false;
        }

        try {
            await this.firebaseService.auth.signInWithEmailLink(email, href);
            window.localStorage.removeItem(LOCAL_STORAGE_KEY);
        } catch (error) {
            this.setErrorMessage(error.message);
        } finally {
            this.setNeedEmailForSignIn(false);
            return true;
        }
    };

    handleUserDataUpdate = async (name, bio, linkedIn) => {
        if (!this.#loggedUserRef) {
            return;
        }

        this.#loggedUserRef.update({
            name,
            bio,
            linkedIn,
        });
    };

    handlePhotoUpload = async (photoToUpload) => {
        if (!this.#loggedUserRef) {
            return;
        }

        try {
            await this.firebaseService.storage.ref(`userPhotos/${this.uid}/${photoToUpload.name}`).put(photoToUpload);

            const url = await this.firebaseService.storage
                .ref(`userPhotos/${this.uid}`)
                .child(photoToUpload.name)
                .getDownloadURL();

            this.#loggedUserRef.update({
                photoUrl: url,
            });

            console.log("Successfully updated photo URL.");
        } catch (error) {
            console.log("Error uploading photo.", error);
        }
    };

    logout = async () => {
        try {
            await this.firebaseService.auth.signOut();
        } catch (error) {
            this.logout();
        }
    };
}

export default AuthStore;
