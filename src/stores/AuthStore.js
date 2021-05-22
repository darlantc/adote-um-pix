import { makeObservable, observable } from "mobx";

import LoginStatus from "../models/LoginStatus";

class AuthStore {
  loggedUser = null;
  loginStatus = LoginStatus.offline;

  constructor(firebaseService) {
    this.firebaseService = firebaseService;
    makeObservable(this, {
      loggedUser: observable,
      loginStatus: observable,
    });
    this.confirmEmailSignIn();
  }

  configSignInEmail = () => {
    return {
      url: "http://localhost:3000/",
      handleCodeInApp: true,
    };
  };

  sendSignInLinkToEmail = async (email) => {
    this.loginStatus = LoginStatus.loading;
    try {
      await this.firebaseService.auth.sendSignInLinkToEmail(
        email,
        this.configSignInEmail()
      );

      localStorage.setItem("emailForSignIn", email);

      this.loginStatus = LoginStatus.online;
    } catch (error) {
      return error;
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
        const result = await this.firebaseService.auth.signInWithEmailLink(
          email,
          window.location.href
        );

        window.localStorage.removeItem("emailForSignIn");
        this.loggedUser = result.user;
      } catch (error) {
        return error;
      }
    }
  };
}

export default AuthStore;
