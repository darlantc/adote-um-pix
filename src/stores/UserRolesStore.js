import { action, makeObservable, observable } from "mobx";

import { APP_ROUTES } from "../routes/Routes";

class UserRolesStore {
    requestsToEvaluate = [];
    isLoading = false;
    getRequests;
    approve;
    deny;
    upgrade;

    constructor(getRequests, approve, deny, upgrade) {
        this.getRequests = getRequests;
        this.approve = approve;
        this.deny = deny;
        this.upgrade = upgrade;

        makeObservable(this, {
            requestsToEvaluate: observable,
            isLoading: observable,
            setRequestsToEvaluate: action,
            setIsLoading: action,
        });
    }

    setRequestsToEvaluate = (newValue) => {
        this.requestsToEvaluate = newValue;
    };

    setIsLoading = (newValue) => {
        this.isLoading = newValue;
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
        this.setIsLoading(true);
        try {
            const userRequests = await this.getRequests();
            this.setRequestsToEvaluate(userRequests);
        } catch (error) {
            console.error("getRequestsToEvaluate error", error);
        } finally {
            this.setIsLoading(false);
        }
    };

    approveRequest = async (request) => {
        await this.approve(request);
        await this.getRequestsToEvaluate();
    };

    denyRequest = async (request) => {
        await this.deny(request);
        await this.getRequestsToEvaluate();
    };

    upgradeUserRole = async (user) => {
        await this.upgrade(user);
    };
}

export default UserRolesStore;
