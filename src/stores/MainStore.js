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
      this.getUserRequests,
      this.addUserRequest,
      this.updateUserRequest,
      this.removeUserRequest
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
      const ref = this.firebaseService.database.ref();
      const data = await ref.child("userRequests").get();
      const val = data.val();

      const allRequests = [...Object.values(val)];

      this.userRequestStore.setUserRequests(allRequests);
    } catch (error) {
      console.log("error on getting users request", error.message);
    }
  };

  addUserRequest = async (request) => {
    if (request) {
      const { userId, pixKey, description } = request;

      try {
        const ref = this.firebaseService.userRequestsRef.push();
        await ref.set({
          userId,
          pixKey,
          description,
          createdAt: this.firebaseService.serverTimestamp,
          status: UserRequestStatus.waitingForApproval,
        });
      } catch (error) {
        console.log("error on adding request", error.message);
      }
    }
  };

  updateUserRequest = async (updatedItem, id) => {
    try {
      await this.firebaseService.userRequestsRefChild(id).set({
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
