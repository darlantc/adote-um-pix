import { when } from "mobx";
import UserRequestStore from "./UserRequestStore";
import AuthStore from "./AuthStore";

import UserRequestStatus from "../models/UserRequestStatus";

class MainStore {
  storesToBeClearedOnLogout = [];
  firebaseService;

  constructor(firebaseService) {
    this.firebaseService = firebaseService;
    this.authStore = new AuthStore(firebaseService);

    this.userRequestStore = new UserRequestStore(
      this.getUserRequests(),
      this.addUserRequest(),
      this.updateUserRequest(),
      this.removeUserRequest()
    );
    this.storesToBeClearedOnLogout.push(this.userRequestStore);

    this.clearStores();
  }

  clearStores = () => {
    when(
      () => !this.authStore.loggedUser,
      () => {
        this.storesToBeClearedOnLogout.forEach((store) => store.clearStore());
      }
    );
  };

  getUserRequests = async () => {
    try {
      const allRequests = await this.firebaseService.userRequestsRef.get();

      this.userRequestStore.setUserRequests(allRequests);
    } catch (error) {
      console.log("error on getting users request", error.message);
    }
  };

  addUserRequest = async ({ userId, pixKey, description }) => {
    try {
      await this.firebaseService.userRequestsRef.set({
        userId,
        pixKey,
        description,
        createdAt: this.serverTimestamp,
        status: UserRequestStatus.waitingForApproval,
      });
    } catch (error) {
      console.log("error on adding request", error.message);
    }
  };

  updateUserRequest = async (updatedItem) => {
    await this.removeUserRequest();
    try {
      await this.firebaseService.userRequestsRef.set({
        ...updatedItem,
      });
    } catch (error) {
      console.log("error on updating request", error.message);
    }
  };

  removeUserRequest = async (deletedId) => {
    try {
      await this.firebaseService.userRequestsRef.child(deletedId).remove();
    } catch (error) {
      console.log("error on deleting request", error.message);
    }
  };
}

export default MainStore;
