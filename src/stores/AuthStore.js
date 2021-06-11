import { makeObservable, observable, action } from "mobx";

import LoginStatus from "../models/LoginStatus";

class AuthStore {
  loggedUser = null;
  loginStatus = LoginStatus.offline;
  errorMessage = null;
  emailForSignIn = null;

  constructor(firebaseService) {
    this.firebaseService = firebaseService;
    makeObservable(this, {
      loggedUser: observable,
      loginStatus: observable,
      errorMessage: observable,
      emailForSignIn: observable,
      setLoggedUser: action,
      setLoginStatus: action,
      setErrorMessage: action,
      setEmailForSignIn: action,
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

  setEmailForSignIn = (value) => {
    this.emailForSignIn = value;
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

  confirmEmailSignIn = async (typedEmail) => {
    const ref = window.location.href;
    let email;
    if (this.firebaseService.auth.isSignInWithEmailLink(ref)) {
      if (typedEmail) {
        email = typedEmail;
      } else {
        email = window.localStorage.getItem("emailForSignIn");
        if (!email) {
          this.setEmailForSignIn("A ser informado.");
        }
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
