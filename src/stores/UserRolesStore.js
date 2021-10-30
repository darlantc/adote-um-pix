import { APP_ROUTES } from "../routes/Routes";

class UserRolesStore {
    requestsToEvaluate = [];
    getRequests;
    approve;
    deny;

    constructor(getRequests, approve, deny) {
        this.getRequests = getRequests;
        this.approve = approve;
        this.deny = deny;
    }

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
