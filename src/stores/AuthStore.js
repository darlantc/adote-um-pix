import { makeObservable, observable, action } from "mobx";

import LoginStatus from "../models/LoginStatus";

class AuthStore {
  loggedUser = null;
  loginStatus = LoginStatus.offline;
  errorMessage = null;

  constructor(firebaseService) {
    this.firebaseService = firebaseService;
    makeObservable(this, {
      loggedUser: observable,
      loginStatus: observable,
      errorMessage: observable,
      setLoggedUser: action,
      setLoginStatus: action,
      setErrorMessage: action,
    });
    this.confirmEmailSignIn();
  }

  setLoggedUser = (value) => {
    this.loggedUser = value;
  };

  setLoginStatus = (value) => {
    this.loginStatus = value;
  };

  setErrorMessage = (value) => {
    this.errorMessage = value;
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
      await this.firebaseService.auth.sendSignInLinkToEmail(
        email,
        this.configSignInEmail()
      );

      localStorage.setItem("emailForSignIn", email);

      this.setLoginStatus(LoginStatus.online);
    } catch (error) {
      this.errorMessage(error.message);
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
          ref
        );

        window.localStorage.removeItem("emailForSignIn");
        this.setLoggedUser(result.user);
        this.setLoginStatus(LoginStatus.online);
      } catch (error) {
        this.errorMessage(error.message);
      }
    }
  };

  recaptchaSetter = (phoneNumber) => {
    window.RecaptchaVerifier = new this.firebaseService.RecaptchaVerifier(
      "recaptcha-container",
      {
        size: "normal",
        callback: (response) => {
          console.log("recaptcha response", response);
          this.signInWithPhoneNumber(phoneNumber);
        },
        "expired-callback": () => {
          console.log("expired recaptcha");
        },
        defaultCountry: "BR",
      }
    );
  };

  signInWithPhoneNumber = async (phoneNumber) => {
    let appVerifier = window.recaptchaVerifier;
    if (!appVerifier) {
      this.recaptchaSetter(phoneNumber);
      return;
    }
    try {
      const result = await this.firebaseService
        .auth()
        .signInWithPhoneNumber(`+55${phoneNumber}`, appVerifier);

      this.setLoggedUser(result.user);
    } catch (error) {
      this.setErrorMessage(error.message);
    }
  };
}

export default AuthStore;
