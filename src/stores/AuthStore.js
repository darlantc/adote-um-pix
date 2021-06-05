import { makeObservable, observable, action, computed } from "mobx";

import LoginStatus from "../models/LoginStatus";

const LOCAL_STORAGE_KEY = "emailForSignIn";

class AuthStore {
    loggedUser = null;
    errorMessage = null;
    emailForSignIn = false;

    constructor(firebaseService) {
        this.firebaseService = firebaseService;
        makeObservable(this, {
            loggedUser: observable,
            errorMessage: observable,
            emailForSignIn: observable,
            setLoggedUser: action,
            setErrorMessage: action,
            setEmailForSignIn: action,
            uid: computed,
            loginStatus: computed,
        });
        firebaseService.auth.onAuthStateChanged(this.setLoggedUser);

        this.verifyLoginStatus();
    }

    setLoggedUser = (value) => {
        this.loggedUser = value;
    };

    setErrorMessage = (value) => {
        this.errorMessage = value;
    };

    setEmailForSignIn = (value) => {
        this.emailForSignIn = value;
    };

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
        console.log(
            "🚀 ~ file: AuthStore.js ~ line 69 ~ AuthStore ~ verifyLoginStatus= ~ isSigningByEmail",
            isSigningByEmail
        );
        if (!isSigningByEmail) {
            console.log(
                "🚀 ~ file: AuthStore.js ~ line 72 ~ AuthStore ~ verifyLoginStatus= ~ this.loggedUser",
                this.loggedUser
            );
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

    confirmEmailSignIn = async (emailFromUser) => {
        const href = window.location.href;
        if (!this.firebaseService.auth.isSignInWithEmailLink(href)) {
            return false;
        }

        const emailFromStorage = window.localStorage.getItem(LOCAL_STORAGE_KEY);
        const email = emailFromStorage || emailFromUser;
        if (!email) {
            return false;
        }

        try {
            await this.firebaseService.auth.signInWithEmailLink(email, href);
            window.localStorage.removeItem(LOCAL_STORAGE_KEY);
        } catch (error) {
            this.setErrorMessage(error.message);
        } finally {
            this.setEmailForSignIn(false);
            return true;
        }
    };

    updateUser = async (uid) => {
        const user = this.loggedUser;
        console.log("🚀 ~ file: AuthStore.js ~ line 120 ~ AuthStore ~ updateUser= ~ user", user);
        const userProfileRef = this.firebaseService.database.ref("users").child(uid);

        userProfileRef.get((snapshot) => {
            if (snapshot) {
                console.log("🚀 ~ file: AuthStore.js ~ line 126 ~ AuthStore ~ userProfileRef.get ~ snapshot", snapshot);
                const updatedUser = {
                    ...user,
                    ...snapshot.val(),
                };

                console.log(
                    "🚀 ~ file: AuthStore.js ~ line 127 ~ AuthStore ~ userProfileRef.get ~ updatedUser",
                    updatedUser
                );

                this.setLoggedUser(updatedUser);
            } else {
                console.log("No data available");
            }
        });
    };

    handleUserDataUpdate = async (displayName, bio, linkedIn) => {
        const user = this.firebaseService.auth.currentUser;

        user.updateProfile({
            displayName,
            bio,
            linkedIn,
        });
    };

    handlePhotoUpload = async (photoToUpload) => {
        try {
            await this.firebaseService.storage.ref(`userPhotos/${this.uid}/${photoToUpload.name}`).put(photoToUpload);

            const url = await this.firebaseService.storage
                .ref(`userPhotos/${this.uid}`)
                .child(photoToUpload.name)
                .getDownloadURL();

            const user = this.firebaseService.auth.currentUser;

            user.updateProfile({
                photoURL: `${url}`,
            });

            console.log("Successfully updated photo URL.");
        } catch (error) {
            console.log("Error uploading photo.", error);
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
