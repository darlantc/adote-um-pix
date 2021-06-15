import { APP_ROUTES } from "../routes/Routes";
import UserRolesStore from "./UserRolesStore";

describe("UserRolesStore", () => {
    it("should init SUT", () => {
        const sut = makeSut();
        expect(sut instanceof UserRolesStore).toBe(true);
    });

    it("should return false with invalid user", () => {
        const sut = makeSut();
        const user = null;

        expect(sut.hasAccessTo(APP_ROUTES.admin, user)).toBe(false);
    });

    it.each([
        ["admin", APP_ROUTES.admin],
        ["admin", APP_ROUTES.approvals],
        ["editor", APP_ROUTES.approvals],
    ])("with level='%s' should allow to access route '%s'", (level, route) => {
        const sut = makeSut();
        const user = { level };

        expect(sut.hasAccessTo(route, user)).toBe(true);
    });

    it.each([
        ["editor", APP_ROUTES.admin],
        ["default", APP_ROUTES.admin],
        ["default", APP_ROUTES.approvals],
    ])("with level='%s' should NOT allow to access route '%s'", (level, route) => {
        const sut = makeSut();
        const user = { level };

        expect(sut.hasAccessTo(route, user)).toBe(false);
    });
});

// Helpers
function makeSut() {
    return new UserRolesStore();
}
