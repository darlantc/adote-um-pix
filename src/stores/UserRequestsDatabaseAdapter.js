import UserRequestStatus from "../models/UserRequestStatus";

class UserRequestsDatabaseAdapter {
    loggedUserRequests = [];
    loggedUserRequestsRef = null;

    constructor(authStore, firebaseService) {
        this.authStore = authStore;
        this.firebaseService = firebaseService;

        this.syncLoggedUserRequests();
    }

    syncLoggedUserRequests = () => {
        this.clearStore();

        if (!this.authStore.loggedUser) {
            return;
        }
        this.loggedUserRequestsRef = this.firebaseService.userRequestsRef
            .orderByChild("user/id")
            .equalTo(this.authStore.loggedUser.uid);

        this.loggedUserRequestsRef.on("value", (snapshots) => {
            snapshots.forEach((snapshot) => {
                this.loggedUserRequests.push({
                    id: snapshot.key,
                    ...snapshot.val(),
                });
            });
        });
    };

    getUserRequests = async () => {
        // TODO: Estratégia para entender o que precisa ser retornado aqui

        // Requisições do usuário que está logado
        return this.loggedUserRequests;

        try {
            // Requisições para alguém que quer ajudar
        } catch (error) {
            console.log("error on getting users request", error.message);
        }
    };

    addUserRequest = async (request) => {
        if (request) {
            const { pixKey, description } = request;
            const { loggedUser } = this.authStore;

            this.firebaseService.userRequestsRef.push({
                user: {
                    id: loggedUser.id,
                    name: loggedUser.name,
                },
                pixKey,
                description,
                createdAt: this.firebaseService.serverTimestamp,
                status: UserRequestStatus.waitingForApproval,
            });
        }
    };

    updateUserRequest = ({ id, ...rest }) => {
        return this.firebaseService.userRequestsRef.child(id).update(rest);
    };

    removeUserRequest = (id) => {
        return this.firebaseService.userRequestsRef.child(id).remove();
    };

    clearStore = () => {
        if (this.loggedUserRequestsRef) {
            this.loggedUserRequestsRef.off("value");
            this.loggedUserRequestsRef = null;
        }
        this.loggedUserRequests = [];
    };
}

export default UserRequestsDatabaseAdapter;
