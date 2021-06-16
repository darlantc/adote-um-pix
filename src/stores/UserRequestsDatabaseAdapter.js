import UserRequestStatus from "../models/UserRequestStatus";
import { APP_ROUTES } from "../routes/Routes";

class UserRequestsDatabaseAdapter {
    loggedUserRequests = [];
    loggedUserRequestsRef = null;

    constructor(authStore, firebaseService) {
        this.authStore = authStore;
        this.firebaseService = firebaseService;
    }

    syncLoggedUserRequests = () => {
        console.log("1");
        this.clearStore();

        if (!this.authStore.loggedUser) {
            console.log("2");
            return;
        }

        this.loggedUserRequestsRef = this.firebaseService.userRequestsRef
            .orderByChild("user/id")
            .equalTo(this.authStore.loggedUser.uid);

        this.loggedUserRequestsRef.on("value", (snapshots) => {
            let userRequests = [];
            console.log("🚀 ~ userRequests", userRequests);
            snapshots.forEach((snapshot) => {
                userRequests.push({
                    id: snapshot.key,
                    ...snapshot.val(),
                });
            });

            this.loggedUserRequests = userRequests;
            console.log("🚀 ~ userRequests", userRequests);
        });
    };

    getUserRequests = async () => {
        if (window.location.href.includes(APP_ROUTES.myRequests)) {
            return this.loggedUserRequests;
        }

        let userRequests = [];

        try {
            this.loggedUserRequestsRef = this.firebaseService.userRequestsRef
                .orderByChild("status")
                .equalTo(UserRequestStatus.available);

            const snapshots = await this.loggedUserRequestsRef.once("value");
            snapshots.forEach((snapshot) => {
                userRequests.push({
                    id: snapshot.key,
                    ...snapshot.val(),
                });
            });
        } catch (error) {
            console.error("UserRequestsDatabaseAdapter -> getUserRequest", error);
        } finally {
            return userRequests;
        }
    };

    addUserRequest = async (request) => {
        if (request) {
            const { pixKey, description } = request;
            const { loggedUser } = this.authStore;

            if (this.firebaseService) {
                this.firebaseService.userRequestsRef.push({
                    user: {
                        id: loggedUser.uid,
                        name: loggedUser.displayName,
                    },
                    pixKey,
                    description,
                    createdAt: this.firebaseService.serverTimestamp,
                    status: UserRequestStatus.waitingForApproval,
                });
            }
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
