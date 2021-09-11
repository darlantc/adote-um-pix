import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import { MainStoreContext } from "../contexts/mainStoreContext";
import { createAuthStore, createUserRequestStore, createInternalEventsStore } from "../utils/mocks/storeMocks.js";
import Routes, { APP_ROUTES } from "./Routes";

describe("<Routes />", () => {
    it.each([
        ["Adote um PIX", APP_ROUTES.home],
        ["Solicite", APP_ROUTES.request],
    ])("should display '%s' heading if current route='%s'.", async (expectedHeading, routePath) => {
        const { getByRole } = getRenderer({ initialEntry: routePath });
        expect(getByRole("heading", { name: expectedHeading })).toBeInTheDocument();
    });

    it.each([
        ["Adote", APP_ROUTES.adopt],
        ["Minhas Solicitações", APP_ROUTES.myRequests],
        ["Perfil", APP_ROUTES.profile],
    ])("should display '%s' heading for private pages if current route='%s'", async (expectedHeading, routePath) => {
        const { getByRole } = getRenderer({
            initialEntry: routePath,
            loggedUser: {
                uid: "123",
            },
        });
        expect(getByRole("heading", { name: expectedHeading })).toBeInTheDocument();
    });

    it("if private route and the user is not logged in should redirect to home", () => {
        const { getByRole } = getRenderer({
            initialEntry: APP_ROUTES.profile,
            loggedUser: null,
        });
        expect(getByRole("heading", { name: "Adote um PIX" })).toBeInTheDocument();
    });

    it("if private route and the user is anonymous should redirect to home", () => {
        const { getByRole } = getRenderer({
            initialEntry: APP_ROUTES.profile,
            loggedUser: {
                uid: "123",
                isAnonymous: true,
            },
        });
        expect(getByRole("heading", { name: "Adote um PIX" })).toBeInTheDocument();
    });
});

function getRenderer({ loggedUser, initialEntry }) {
    const internalEventsStore = createInternalEventsStore();
    return {
        ...render(
            <MainStoreContext.Provider
                value={{
                    authStore: createAuthStore({ loggedUser, internalEventsStore }),
                    userRequestStore: createUserRequestStore({}),
                    internalEventsStore: internalEventsStore,
                }}
            >
                <MemoryRouter initialEntries={[initialEntry]}>
                    <Routes />
                </MemoryRouter>
            </MainStoreContext.Provider>
        ),
        internalEventsStore,
    };
}
