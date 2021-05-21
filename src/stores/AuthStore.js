class AuthStore {
  loggedUser = null;

  constructor(firebaseService) {
    this.firebaseService = firebaseService;
  }

  configSignInEmail = () => {
    return {
      url: "https://adote-um-pix.firebaseapp.com/perfil",
      handleCodeInApp: true,
    };
  };

  sendSignInLinkToEmail = async (email) => {
    try {
      await this.firebaseService.auth.sendSignInLinkToEmail(
        email,
        this.configSignInEmail()
      );

      localStorage.setItem("emailForSignIn", email);

      console.log("3");
    } catch (error) {
      return error;
    }
  };

  confirmEmailSignIn = async () => {
    if (this.firebaseService.auth.isSignInWithEmailLink(window.location.href)) {
      let email = window.localStorage.getItem("emailForSignIn");
      if (!email) {
        email = window.prompt("Please provide your email for confirmation");
      }

      try {
        const result = await this.firebaseService
          .auth()
          .signInWithEmailLink(email, window.location.href);

        window.localStorage.removeItem("emailForSignIn");

        this.loggedUser = result.user;
      } catch (error) {
        return error;
      }
    }
  };
}

export default AuthStore;
