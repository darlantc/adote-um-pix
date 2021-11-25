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

    approveRequest = async ({ id, ...rest }) => {
        await this.firebaseService.userRequestsRef
            .child(`${id}`)
            .update({ ...rest, status: UserRequestStatus.available });
    };

    denyRequest = async ({ id, ...rest }) => {
        await this.firebaseService.userRequestsRef
            .child(`${id}`)
            .update({ ...rest, status: UserRequestStatus.canceled });
    };

    upgradeUserRole = async ({ id, ...rest }) => {
        const user = { ...rest, role: "admin" };
        await this.firebaseService.usersRef.child(`${id}`).update(user);
    };

    getUsersToPromote = async () => {
        try {
            this.usersRef = this.firebaseService.usersRef.orderByChild("role").equalTo("default");

            let users = [];
            const snapshots = await this.usersRef.once("value");
            snapshots.forEach((snapshot) => {
                users.push({
                    id: snapshot.key,
                    ...snapshot.val(),
                });
            });
            return users;
        } catch (error) {
            console.error("UserDatabaseAdapter -> getUser", error);
        }
    };
}

export default UserRolesStoreAdapter;
