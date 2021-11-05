import { action, makeObservable, observable } from "mobx";

import { APP_ROUTES } from "../routes/Routes";

class UserRolesStore {
    requestsToEvaluate = [];
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
            setrRquestsToEvaluate: action,
        });
    }

    setrRquestsToEvaluate = (newValue) => {
        this.requestsToEvaluate = newValue;
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
        const userRequests = await this.getRequests();
        this.setrRquestsToEvaluate(userRequests);
    };

    approveRequest = async () => {
        await this.approve();
        await this.getRequests();
    };

    denyRequest = async () => {
        await this.deny();
        await this.getRequests();
    };

    upgradeUserRole = async () => {
        await this.upgrade();
    };
}

export default UserRolesStore;
