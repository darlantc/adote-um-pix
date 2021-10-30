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

        this.userStore = new UserStore(this.getUser);

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

        this.clearStores();
    }

    getUserRequestsDatabase = (authStore, firebaseService) => {
        const adapter = new UserRequestsDatabaseAdapter(authStore, firebaseService);

        return adapter;
    };

    getUser = async () => {
        // TODO: Criar a conexão desse callback com o banco de dados Firebase

        // Código temporário para simular uma resposta assíncrona após 3 segundos
        await new Promise((resolve) => setTimeout(resolve, 3000));
        return {
            id: "abc",
            name: "Test",
            role: "default",
        };
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
}

export default MainStore;
