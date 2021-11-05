import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { MainStoreContext } from "./contexts/mainStoreContext";
import { InternalEvents } from "./stores/InternalEventsStore";
import { createAuthStore, createInternalEventsStore, createUserStore } from "./utils/mocks/storeMocks";

import App from "./App";

describe("<App />", () => {
    it("should subscribe to notification internal event", () => {
        const { internalEventsStore } = getRenderer({});
        expect(
            internalEventsStore.subscribers[InternalEvents.notification].find(({ observer }) => observer === "App")
        ).toBeTruthy();
    });

    it.each(["Notificação", "Outra notificação"])(
        "should display notification toast with message='%s'",
        async (expected) => {
            const { findByText, internalEventsStore } = getRenderer({});

            internalEventsStore.notify({
                event: InternalEvents.notification,
                params: { type: "success", message: expected },
            });
            expect(await findByText(expected)).toBeInTheDocument();
        }
    );

    it("should display loading animation if user is falsy", async () => {
        const { getByAltText } = getRenderer({ user: null });

        expect(getByAltText("Animação de Carregamento")).toBeInTheDocument();
    });
});

function getRenderer({ user }) {
    const internalEventsStore = createInternalEventsStore();
    return {
        ...render(
            <MainStoreContext.Provider
                value={{
                    authStore: createAuthStore({ user, internalEventsStore }),
                    userStore: createUserStore(),
                    internalEventsStore: internalEventsStore,
                }}
            >
                <MemoryRouter>
                    <App />
                </MemoryRouter>
            </MainStoreContext.Provider>
        ),
        internalEventsStore,
    };
}
