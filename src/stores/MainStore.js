import { reaction } from "mobx";
import UserRequestStore from "./UserRequestStore";
import UserRequestsDatabaseAdapter from "./UserRequestsDatabaseAdapter";
import AuthStore from "./AuthStore";
import UserStore from "./UserStore";

class MainStore {
    storesToBeClearedOnLogout = [];
    userRequestsDatabase;
    firebaseService;

    constructor(firebaseService) {
        this.firebaseService = firebaseService;
        this.authStore = new AuthStore(firebaseService);

        this.userRequestsDatabase = this.getUserRequestsDatabase(this.authStore, firebaseService);
        this.storesToBeClearedOnLogout.push(this.userRequestsDatabase);
        const { getUserRequests, addUserRequest, updateUserRequest, removeUserRequest } = this.userRequestsDatabase;

        this.userRequestStore = new UserRequestStore(
            getUserRequests,
            addUserRequest,
            updateUserRequest,
            removeUserRequest
        );
        this.storesToBeClearedOnLogout.push(this.userRequestStore);

        this.userStore = new UserStore(this.getUser);

        this.clearStores();
    }

    getUserRequestsDatabase = (authStore, firebaseService) => {
        const adapter = new UserRequestsDatabaseAdapter(authStore, firebaseService);

        return adapter;
    };

    clearStores = () => {
        reaction(
            () => this.authStore.loggedUser,
            (isAuthenticated) => {
                if (isAuthenticated) {
                    this.userRequestsDatabase.syncLoggedUserRequests();
                } else {
                    this.storesToBeClearedOnLogout.forEach((store) => store.clearStore());
                }
            }
        );
    };

    getUser = () => {
        // TODO: Criar a conexão desse callback com o banco de dados Firebase
        return {
            photoUrl: null,
            name: "Mateus",
            linkedIn: "https://www.linkedin.com/in/mateuspereiras/",
            bio: "Padeiro",
            pixKey: "06029908588",
        };
    };
}

export default MainStore;
