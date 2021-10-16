import { reaction } from "mobx";
import UserRequestStore from "./UserRequestStore";
import UserRequestsDatabaseAdapter from "./UserRequestsDatabaseAdapter";
import AuthStore from "./AuthStore";
import UserStore from "./UserStore";
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
        const { getUserRequests, addUserRequest, updateUserRequest, removeUserRequest } = this.userRequestsDatabase;

        // TODO: implementar getByUrl do userRequestStore no Adapter
        this.userRequestStore = new UserRequestStore(
            getUserRequests,
            addUserRequest,
            updateUserRequest,
            removeUserRequest,
            this.internalEventsStore
        );
        this.storesToBeClearedOnLogout.push(this.userRequestStore);

        this.userStore = new UserStore(this.getUser);

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

    getUser = () => {
        // TODO: Criar a conexão desse callback com o banco de dados Firebase
        return {
            photoUrl: null,
            fullName: "Mateus",
            linkedIn: "https://www.linkedin.com/in/mateuspereiras/",
            bio: "Padeiro",
            pixKey: "06029908588",
        };
    };
}

export default MainStore;
