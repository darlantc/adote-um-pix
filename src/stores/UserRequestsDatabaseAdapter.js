import UserRequestStatus from "../models/UserRequestStatus";

import APP_ROUTES from "../routes/Routes";

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
            console.log("🚀 ~ NO - loggedUser");
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

            console.log(
                "🚀 ~ SYNC - loggedUserRequests",
                this.loggedUserRequests
            );
        });
    };

    getUserRequests = async () => {
        console.log(
            "🚀 ~ window.location.href",
            `${window.location.href.indexOf("minhas")} ${APP_ROUTES.myRequests}`
        );
        if (window.location.href.indexOf("minhas") >= 0) {
            return this.loggedUserRequests;
        }

        this.loggedUserRequestsRef = this.firebaseService.userRequestsRef
            .orderByChild("status")
            .equalTo(UserRequestStatus.available);

        this.loggedUserRequestsRef.once("value", (snapshots) => {
            console.log("🚀 ~ Whole ~ snapshots", snapshots);
            snapshots.forEach((snapshot) => {
                this.authStore.userRequests.push({
                    id: snapshot.key,
                    ...snapshot.val(),
                });
            });
        });
    };

    addUserRequest = async (request) => {
        if (request) {
            const { pixKey, description } = request;
            const { loggedUser } = this.authStore;

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
