import { render } from "@testing-library/react";
import { MainStoreContext } from "../contexts/mainStoreContext";
import { createUserRequestStore, createAuthStore, createInternalEventsStore } from "../utils/mocks/storeMocks";

import Request from "./Request";

describe("<Request />", () => {
    it("should have heading with page title 'Solicite'", () => {
        const { getByRole } = getRenderer({});
        expect(getByRole("heading", { name: "Solicite" })).toBeInTheDocument();
    });
});

function getRenderer({ get, add, update, remove }) {
    return render(
        <MainStoreContext.Provider
            value={{
                userRequestStore: createUserRequestStore({ get, add, update, remove }),
                authStore: createAuthStore({}),
                internalEventsStore: createInternalEventsStore(),
            }}
        >
            <Request />
        </MainStoreContext.Provider>
    );
}
