import { reaction } from "mobx";
import UserRequestStore from "./UserRequestStore";
import UserRequestsDatabaseAdapter from "./UserRequestsDatabaseAdapter";
import AuthStore from "./AuthStore";

class MainStore {
    storesToBeClearedOnLogout = [];
    userRequestsDatabase;
    firebaseService;

    constructor(firebaseService) {
        this.firebaseService = firebaseService;
        this.authStore = new AuthStore(firebaseService);

        this.userRequestsDatabase = this.getUserRequestsDatabase(this.authStore, firebaseService);
        this.storesToBeClearedOnLogout.push(this.userRequestsDatabase);
        const [getUserRequest, addUserRequest, updateUserRequest, deleteUserRequest] = this.userRequestsDatabase;

        this.userRequestStore = new UserRequestStore(
            getUserRequest,
            addUserRequest,
            updateUserRequest,
            deleteUserRequest
        );
        this.storesToBeClearedOnLogout.push(this.userRequestStore);

        this.clearStores();
    }

    getUserRequestsDatabase = (authStore, firebaseService) => {
        const adapter = new UserRequestsDatabaseAdapter(authStore, firebaseService);

        return [adapter.getUserRequests, adapter.addUserRequest, adapter.updateUserRequest, adapter.removeUserRequest];
    };

    clearStores = () => {
        reaction(
            () => this.authStore.loggedUser,
            (isAuthenticated) => {
                if (isAuthenticated) {
                    console.log("🚀 isAuthenticated");
                    this.userRequestsDatabase.syncLoggedUserRequests();
                } else {
                    this.storesToBeClearedOnLogout.forEach((store) => store.clearStore());
                }
            }
        );
    };
}

export default MainStore;
