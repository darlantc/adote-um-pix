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
        this.clear();

        if (!this.authStore.loggedUser) {
            return;
        }

        this.loggedUserRequestsRef = this.firebaseService.userRequestsRef
            .orderByChild("user/id")
            .equalTo(this.authStore.loggedUser.uid);

        this.loggedUserRequestsRef.on("value", (snapshots) => {
            let userRequests = [];
            snapshots.forEach((snapshot) => {
                userRequests.push({
                    id: snapshot.key,
                    ...snapshot.val(),
                });
            });

            this.loggedUserRequests = userRequests;
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

    getUserRequestByUrl = async (url) => {
        let userRequest = null;
        try {
            this.specificUserRequestsRef = this.firebaseService.userRequestsRef.orderByChild("url").equalTo(url);

            const snapshots = await this.specificUserRequestsRef.once("value");
            snapshots.forEach((snapshot) => {
                userRequest = snapshot.val();
            });
        } catch (error) {
            console.error("UserRequestsDatabaseAdapter -> getUserRequest", error);
        } finally {
            return userRequest;
        }
    };

    addUserRequest = async (request) => {
        if (request) {
            const { pixKey, description } = request;
            const { loggedUserProfile, loggedUser } = this.authStore;

            if (this.firebaseService) {
                this.firebaseService.userRequestsRef.push({
                    user: {
                        id: loggedUser.uid,
                        name: loggedUserProfile.fullName,
                        photoUrl: loggedUserProfile.photoUrl,
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

    clear = () => {
        if (this.loggedUserRequestsRef) {
            this.loggedUserRequestsRef.off("value");
            this.loggedUserRequestsRef = null;
        }
        this.loggedUserRequests = [];
    };
}

export default UserRequestsDatabaseAdapter;
