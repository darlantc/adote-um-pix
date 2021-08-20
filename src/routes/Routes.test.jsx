import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import { MainStoreContext } from "../contexts/mainStoreContext";
import { InternalEvents } from "../stores/InternalEventsStore";
import { createAuthStore, createUserRequestStore, createInternalEventsStore } from "../utils/mocks/storeMocks.js";

import Homepage from "../pages/Homepage";
import Request from "../pages/Request";

import Routes from "./Routes";

describe("<Routes />", () => {
    it.each([
        ["Adote um PIX", Homepage],
        ["Solicite", Request],
    ])("should display '%s' heading if initialEntries='%s'.", async (expectedHeading, expectedComponent) => {
        const { getByRole } = getRenderer({ component: expectedComponent });

        expect(getByRole("heading", { name: expectedHeading })).toBeInTheDocument();
    });
});

function getRenderer({ user, component }) {
    const internalEventsStore = createInternalEventsStore();
    return {
        ...render(
            <MainStoreContext.Provider
                value={{
                    authStore: createAuthStore({ user, internalEventsStore }),
                    userRequestStore: createUserRequestStore({}),
                    internalEventsStore: internalEventsStore,
                }}
            >
                <MemoryRouter initialEntries={[component]}>
                    <Routes />
                </MemoryRouter>
            </MainStoreContext.Provider>
        ),
        internalEventsStore,
    };
}
