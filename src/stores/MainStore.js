import UserRequestStore from "./UserRequestStore";
import AuthStore from "./AuthStore";
import FirebaseService from "../services/FirebaseService";
import UserStore from "./UserStore";

class MainStore {
    constructor() {
        const firebaseService = new FirebaseService();
        this.authStore = new AuthStore(firebaseService);
        this.userRequestStore = new UserRequestStore();

        this.userStore = new UserStore(this.getUser);
    }

    getUser = () => {
        // TODO: Criar a conexão desse callback com o banco de dados Firebase
        return {
            id: "abc",
            name: "Test",
        };
    };
}

export default MainStore;
