import { APP_ROUTES } from "../routes/Routes";
import UserRolesStore from "./UserRolesStore";

describe("UserRolesStore", () => {
    describe("hasAccessTo", () => {
        it.each([undefined, null])("should return false with user='%p'", (user) => {
            expect(UserRolesStore.hasAccessTo(APP_ROUTES.admin, user)).toBe(false);
        });

        it.each([
            ["admin", APP_ROUTES.admin],
            ["admin", APP_ROUTES.approvals],
            ["editor", APP_ROUTES.approvals],
        ])("with role='%s' should allow to access route '%s'", (role, route) => {
            const user = { role };

            expect(UserRolesStore.hasAccessTo(route, user)).toBe(true);
        });

        it.each([
            ["editor", APP_ROUTES.admin],
            ["default", APP_ROUTES.admin],
            ["default", APP_ROUTES.approvals],
        ])("with role='%s' should NOT allow to access route '%s'", (role, route) => {
            const user = { role };

            expect(UserRolesStore.hasAccessTo(route, user)).toBe(false);
        });
    });
});

// Helpers
function makeSut() {
    return new UserRolesStore();
}
