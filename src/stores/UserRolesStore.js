import { action, computed, makeObservable, observable } from "mobx";

import { APP_ROUTES } from "../routes/Routes";

class UserRolesStore {
    requestsToEvaluate = [];
    requestIndex = 1;
    usersToPromote = [];
    usersToDowngrade = [];
    isLoadingRequests = false;
    isLoadingUsers = false;
    getRequests;
    approve;
    deny;
    upgrade;
    downgrade;
    getUsersToPromote;
    getUsersToDowngrade;

    constructor(getRequests, approve, deny, upgrade, downgrade, getUsersToPromote, getUsersToDowngrade) {
        this.getRequests = getRequests;
        this.approve = approve;
        this.deny = deny;
        this.upgrade = upgrade;
        this.downgrade = downgrade;
        this.getUsersToPromote = getUsersToPromote;
        this.getUsersToDowngrade = getUsersToDowngrade;

        makeObservable(this, {
            requestsToEvaluate: observable,
            isLoadingUsers: observable,
            isLoadingRequests: observable,
            requestIndex: observable,
            usersToPromote: observable,
            usersToDowngrade: observable,
            selectedRequest: computed,
            setRequestsToEvaluate: action,
            setRequestIndex: action,
            setIsLoadingUsers: action,
            setIsLoadingRequests: action,
            setUsersToPromote: action,
            setUsersToDowngrade: action,
        });
    }

    get selectedRequest() {
        if (this.requestsToEvaluate.length < 1) {
            return null;
        }

        return this.requestsToEvaluate[this.requestIndex - 1];
    }

    setRequestIndex = (newValue) => {
        this.requestIndex = newValue;
    };

    setRequestsToEvaluate = (newValue) => {
        this.requestsToEvaluate = newValue;
    };

    setIsLoadingUsers = (newValue) => {
        this.isLoadingUsers = newValue;
    };

    setIsLoadingRequests = (newValue) => {
        this.isLoadingRequests = newValue;
    };

    setUsersToPromote = (newValue) => {
        this.usersToPromote = newValue;
    };

    setUsersToDowngrade = (newValue) => {
        this.usersToDowngrade = newValue;
    };

    static hasAccessTo = (route, user) => {
        if (user?.role === "admin") {
            return true;
        }
        if (user?.role === "editor") {
            return [APP_ROUTES.approvals].includes(route);
        }
        return false;
    };

    getRequestsToEvaluate = async () => {
        this.setIsLoadingRequests(true);
        try {
            const userRequests = await this.getRequests();
            this.setRequestsToEvaluate(userRequests);
        } catch (error) {
            console.error("getRequestsToEvaluate error", error);
        } finally {
            this.setIsLoadingRequests(false);
        }
    };

    getListOfUsers = async () => {
        this.setIsLoadingUsers(true);
        try {
            const usersToPromote = await this.getUsersToPromote();
            const usersToDowngrade = await this.getUsersToDowngrade();

            this.setUsersToPromote(usersToPromote);
            this.setUsersToDowngrade(usersToDowngrade);
        } catch (error) {
            console.error("Error getListOfUsersToPromote", error);
        } finally {
            this.setIsLoadingUsers(false);
        }
    };

    approveRequest = async () => {
        await this.approve(this.selectedRequest);
        await this.getRequestsToEvaluate();
    };

    denyRequest = async () => {
        await this.deny(this.selectedRequest);
        await this.getRequestsToEvaluate();
    };

    upgradeUserRole = async (user) => {
        await this.upgrade(user);
        await this.getListOfUsers();
    };

    downgradeUserRole = async (user) => {
        await this.downgrade(user);
        await this.getListOfUsers();
    };

    increaseRequestIndex = () => {
        let nextIndex = this.requestIndex + 1;
        if (nextIndex > this.requestsToEvaluate.length) {
            nextIndex = 1;
        }
        this.setRequestIndex(nextIndex);
    };

    decreaseRequestIndex = () => {
        let previousIndex = this.requestIndex - 1;
        if (previousIndex < 1) {
            previousIndex = this.requestsToEvaluate.length;
        }
        this.setRequestIndex(previousIndex);
    };
}

export default UserRolesStore;
