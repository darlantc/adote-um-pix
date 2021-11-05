import { reaction } from "mobx";
import UserRequestStore from "./UserRequestStore";
import UserRequestsDatabaseAdapter from "./UserRequestsDatabaseAdapter";
import UserRolesDatabaseAdapter from "./UserRolesDatabaseAdapter";
import UserDatabaseAdapter from "./UserDatabaseAdapter";
import AuthStore from "./AuthStore";
import UserStore from "./UserStore";
import UserRolesStore from "./UserRolesStore";
import InternalEventsStore, { InternalEvents } from "./InternalEventsStore";

class MainStore {
    storesToBeClearedOnLogout = [];
    userRequestsDatabase;
    internalEventsStore;
    firebaseService;

    constructor(firebaseService) {
        this.firebaseService = firebaseService;
        this.internalEventsStore = new InternalEventsStore();
        this.authStore = new AuthStore(this.internalEventsStore, firebaseService);

        this.getUserRequestsDatabase(this.authStore, firebaseService);

        this.storesToBeClearedOnLogout.push(this.userRequestsDatabase);

        const { getUserRequests, getUserRequestByUrl, addUserRequest, updateUserRequest, removeUserRequest } =
            this.userRequestsDatabase;

        this.userRequestStore = new UserRequestStore(
            getUserRequests,
            getUserRequestByUrl,
            addUserRequest,
            updateUserRequest,
            removeUserRequest,
            this.internalEventsStore
        );
        this.storesToBeClearedOnLogout.push(this.userRequestStore);

        this.userRolesDatabase = new UserRolesDatabaseAdapter(this.authStore, firebaseService);
        this.storesToBeClearedOnLogout.push(this.userRolesDatabase);

        const { getUserRolesRequests, approveRequest, denyRequest, upgradeUserRole } = this.userRolesDatabase;

        this.userRolesStore = new UserRolesStore(getUserRolesRequests, approveRequest, denyRequest, upgradeUserRole);
        this.storesToBeClearedOnLogout.push(this.userRolesStore);

        this.userDatabase = new UserDatabaseAdapter(this.authStore, firebaseService);
        this.storesToBeClearedOnLogout.push(this.userDatabase);

        this.userStore = new UserStore(this.userDatabase.getUser);
        this.storesToBeClearedOnLogout.push(this.userStore);

        this.clearStores();
    }

    getUserRequestsDatabase = (authStore, firebaseService) => {
        this.userRequestsDatabase = new UserRequestsDatabaseAdapter(authStore, firebaseService);
        this.internalEventsStore.subscribeTo({
            event: InternalEvents.login,
            observer: this.userRequestsDatabase,
            callback: (isAuthenticated) => {
                if (isAuthenticated) {
                    this.userRequestsDatabase.syncLoggedUserRequests();
                } else {
                    this.userRequestsDatabase.clear();
                }
            },
        });
    };

    clearStores = () => {
        reaction(
            () => this.authStore.loggedUser,
            (isAuthenticated) => {
                if (!isAuthenticated) {
                    this.storesToBeClearedOnLogout.forEach((store) => store.clearStore());
                }
            }
        );
    };
}

export default MainStore;
