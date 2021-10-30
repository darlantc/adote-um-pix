import { APP_ROUTES } from "../routes/Routes";

class UserRolesStore {
    requestsToEvaluate = [];
    getRequests;
    approve;
    deny;

    constructor(getRequests, approve, deny, loggedUser) {
        this.getRequests = getRequests;
        this.approve = approve;
        this.deny = deny;
    }

    /*
    hasAccessTo = (route, user) => {
        if (user?.level === "admin") {
            return true;
        }
        if (user?.level === "editor") {
            return [APP_ROUTES.approvals].includes(route);
        }
        return false;
    };
    */

    getRequestsToEvaluate = async () => {
        const userRequests = await this.getRequests();
        this.requestsToEvaluate = userRequests;
    };

    approveRequest = async () => {
        await this.approve();
        await this.getRequests();
    };

    denyRequest = async () => {
        await this.deny();
        await this.getRequests();
    };

    // TODO: Salvar / alterar nível de acesso de um usuário
}

export default UserRolesStore;
