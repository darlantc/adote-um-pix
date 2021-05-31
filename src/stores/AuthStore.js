import { makeObservable, observable, action } from "mobx";

import LoginStatus from "../models/LoginStatus";

class AuthStore {
    loggedUser = null;
    loginStatus = LoginStatus.offline;
    error = null;

    constructor(firebaseService) {
        this.firebaseService = firebaseService;
        makeObservable(this, {
            loggedUser: observable,
            loginStatus: observable,
            setLoggedUser: action,
            setLoginStatus: action,
        });
        // this.confirmEmailSignIn();

        // TODO: Código temporário pra validar essa branch
        this.setLoggedUser({
            uid: "user1",
        });
    }

    setLoggedUser = (value) => {
        this.loggedUser = value;
    };

    setLoginStatus = (value) => {
        this.loginStatus = value;
    };

    setError = (value) => {
        this.error = value;
    };

    configSignInEmail = () => {
        return {
            url: "http://localhost:3000/",
            handleCodeInApp: true,
        };
    };

    sendSignInLinkToEmail = async (email) => {
        this.setLoginStatus(LoginStatus.loading);
        try {
            await this.firebaseService.auth.sendSignInLinkToEmail(email, this.configSignInEmail());

            localStorage.setItem("emailForSignIn", email);

            this.setLoginStatus(LoginStatus.online);
        } catch (error) {
            this.setError(error);
        }
    };

    confirmEmailSignIn = async () => {
        const ref = window.location.href;
        if (this.firebaseService.auth.isSignInWithEmailLink(ref)) {
            let email = window.localStorage.getItem("emailForSignIn");
            if (!email) {
                email = window.prompt("Please provide your email for confirmation");
            }

            try {
                const result = await this.firebaseService.auth.signInWithEmailLink(email, ref);

                window.localStorage.removeItem("emailForSignIn");
                this.setLoggedUser(result.user);
                this.setLoginStatus(LoginStatus.online);
            } catch (error) {
                this.setError(error);
            }
        }
    };
}

export default AuthStore;
