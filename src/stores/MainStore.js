import { when } from "mobx";
import UserRequestStore from "./UserRequestStore";
import AuthStore from "./AuthStore";

class MainStore {
    storesToBeClearedOnLogout = [];
    firebaseService;

    constructor(firebaseService) {
        this.firebaseService = firebaseService;
        this.authStore = new AuthStore(firebaseService);

        this.userRequestStore = new UserRequestStore(
            this.getUserRequests(),
            this.addUserRequests(),
            this.updateUserRequests(),
            this.removeUserRequests()
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
        // TODO: aplicar regras de negócio
        // Quando o usuário logado fizer uma nova requisição
        // Quando o usuário logado visualizar suas requisições
        // Quando um usuário estiver visualizando a tela de adote

        const { loggedUser } = this.authStore;

        return [];
    };
    addUserRequests = async (addedItem) => {
        // this.firebaseService.userRequestsRef.push();
    };
    updateUserRequests = async (updatedItem) => {};
    removeUserRequests = async (deletedId) => {};
}

export default MainStore;
