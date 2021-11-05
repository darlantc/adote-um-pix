import { reaction } from "mobx";
import UserRequestStore from "./UserRequestStore";
import UserRequestsDatabaseAdapter from "./UserRequestsDatabaseAdapter";
import UserRolesDatabaseAdapter from "./UserRolesDatabaseAdapter";
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

        this.userRequestsDatabase = this.getUserRequestsDatabase(this.authStore, firebaseService);
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

        const { getUserRolesRequests, approveRequest, denyRequest } = this.userRolesDatabase;

        this.userRolesStore = new UserRolesStore(getUserRolesRequests, approveRequest, denyRequest);
        this.storesToBeClearedOnLogout.push(this.userRolesStore);

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

    getUser = async () => {
        // TODO: Criar a conexão desse callback com o banco de dados Firebase

        // Código temporário para simular uma resposta assíncrona após 3 segundos
        await new Promise((resolve) => setTimeout(resolve, 3000));
        return {
            photoUrl: null,
            fullName: "Mateus",
            linkedIn: "https://www.linkedin.com/in/mateuspereiras/",
            bio: "Padeiro",
            pixKey: "06029908588",
            role: "default",
        };
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
