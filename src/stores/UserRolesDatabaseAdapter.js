import UserRequestStatus from "../models/UserRequestStatus";
import { APP_ROUTES } from "../routes/Routes";

class UserRolesStoreAdapter {
    constructor(authStore, firebaseService) {
        this.authStore = authStore;
        this.firebaseService = firebaseService;
    }

    getUserRolesRequests = async () => {
        if (window.location.href.includes(APP_ROUTES.myRequests)) {
            return this.loggedUserRequests;
        }

        let userRequests = [];

        try {
            this.loggedUserRequestsRef = this.firebaseService.userRequestsRef
                .orderByChild("status")
                .equalTo(UserRequestStatus.waitingForApproval);

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

    approveRequest = async ({ id }) => {
        await this.firebaseService.userRequestsRef.child(`${id}/status`).update(UserRequestStatus.available);
    };

    denyRequest = async ({ id }) => {
        await this.firebaseService.userRequestsRef.child(`${id}/status`).update(UserRequestStatus.canceled);
    };

    upgradeUserRole = async ({ id }) => {
        await this.firebaseService.userRequestsRef.child(`${id}/role`).update("admin");
    };
}

export default UserRolesStoreAdapter;
