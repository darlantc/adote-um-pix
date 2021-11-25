import { action, computed, makeObservable, observable } from "mobx";

import { APP_ROUTES } from "../routes/Routes";

class UserRolesStore {
    requestsToEvaluate = [];
    requestIndex = 1;
    usersToPromote = [];
    isLoadingRequests = false;
    isLoadingUsers = false;
    getRequests;
    approve;
    deny;
    upgrade;
    getUsersToPromote;

    constructor(getRequests, approve, deny, upgrade, getUsersToPromote) {
        this.getRequests = getRequests;
        this.approve = approve;
        this.deny = deny;
        this.upgrade = upgrade;
        this.getUsersToPromote = getUsersToPromote;

        makeObservable(this, {
            requestsToEvaluate: observable,
            isLoadingUsers: observable,
            isLoadingRequests: observable,
            requestIndex: observable,
            usersToPromote: observable,
            selectedRequest: computed,
            setRequestsToEvaluate: action,
            setRequestIndex: action,
            setIsLoadingUsers: action,
            setIsLoadingRequests: action,
            setUsersToPromote: action,
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

    getListOfUsersToPromote = async () => {
        this.setIsLoadingUsers(true);
        try {
            const users = await this.getUsersToPromote();
            this.setUsersToPromote(users);
        } catch (error) {
            console.log("Error", error);
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
        await this.getListOfUsersToPromote();
    };

    increaseRequestIndex = () => {
        if (this.requestIndex + 1 <= this.requestsToEvaluate.length) {
            this.setRequestIndex(this.requestIndex + 1);
        } else {
            this.setRequestIndex(1);
        }
    };

    decreaseRequestIndex = () => {
        if (this.requestIndex > 1) {
            this.setRequestIndex(this.requestIndex - 1);
        } else {
            this.setRequestIndex(this.requestsToEvaluate.length);
        }
    };
}

export default UserRolesStore;
