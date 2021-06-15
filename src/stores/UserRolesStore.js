import { APP_ROUTES } from "../routes/Routes";

class UserRolesStore {
    constructor() {}
    hasAccessTo = (route, user) => {
        if (user?.level === "admin") {
            return true;
        }
        if (user?.level === "editor") {
            return [APP_ROUTES.approvals].includes(route);
        }
        return false;
    };

    // TODO: Salvar / alterar nível de acesso de um usuário
}

export default UserRolesStore;
