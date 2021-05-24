import UserRequestStore from "./UserRequestStore";
import AuthStore from "./AuthStore";
import FirebaseService from "../services/FirebaseService";

class MainStore {
  constructor() {
    const firebaseService = new FirebaseService();
    this.authStore = new AuthStore(firebaseService);
    this.userRequestStore = new UserRequestStore();
  }
}

export default MainStore;
