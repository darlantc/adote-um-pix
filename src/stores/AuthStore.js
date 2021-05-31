import { makeObservable, observable, reaction, action, computed } from "mobx";

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
      uid: computed,
    });
    this.confirmEmailSignIn();
    reaction(
      () => this.uid,
      (uid) => {
        this.updateUser(uid);
      }
    );
  }

  setLoggedUser = (user) => {
    this.loggedUser = user;
  };

  setLoginStatus = (value) => {
    this.loginStatus = value;
  };

  setErrorMessage = (value) => {
    this.errorMessage = value;
  };

  get uid() {
    if (this.loggedUser) {
      return this.loggedUser.uid;
    }
    return null;
  }

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
      this.setErrorMessage(error.message);
    }
  };

  authenticateUserWithEmail = async (email) => {
    this.setLoginStatus(LoginStatus.loading);
    const credential =
      this.firebaseService.authParam.EmailAuthProvider.credentialWithLink(
        email,
        window.location.href
      );
    try {
      const { user } =
        await this.firebaseService.auth.currentUser.linkWithCredential(
          credential
        );

      this.setLoggedUser(user);
    } catch (error) {
      this.setErrorMessage(error.message);
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

        const user = result.user;

        this.setLoggedUser(user);
        this.writeUserData();
        this.setLoginStatus(LoginStatus.online);
      } catch (error) {
        this.setErrorMessage(error.message);
      }
    }
  };

  updateUser = async (uid) => {
    const user = this.loggedUser;
    const userProfileRef = this.firebaseService.database
      .ref()
      .child("users")
      .child(uid);

    userProfileRef.get((snapshot) => {
      if (snapshot) {
        const updatedUser = {
          ...user,
          ...snapshot.val(),
        };

        console.log("updated", updatedUser);

        this.setLoggedUser(updatedUser);
      } else {
        console.log("No data available");
      }
    });
  };

  userDataUpdating = async (userId, nome, bio, linkedIn) => {
    try {
      this.firebaseService.database.ref("users/" + userId).set({
        username: nome,
        bio: bio,
        linkedIn: linkedIn,
      });
      console.log("success");
    } catch (error) {
      console.log("error on editing", error);
    }
  };
}

export default AuthStore;
