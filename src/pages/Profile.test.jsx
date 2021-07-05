import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { MainStoreContext } from "../contexts/mainStoreContext";
import { createAuthStore } from "../utils/mocks/storeMocks";

import Profile from "./Profile";

describe("<Profile />", () => {
    it("should display user engagement", () => {
        // TODO: implementar esse teste
        const {} = getRenderer();
        expect(1).toBe(1);
    });
});

function getRenderer({ user }) {
    return render(
        <MainStoreContext.Provider value={{ authStore: createAuthStore({ user }) }}>
            <MemoryRouter>
                <Profile />
            </MemoryRouter>
        </MainStoreContext.Provider>
    );
}
