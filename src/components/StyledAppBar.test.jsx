import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { MainStoreContext } from "../contexts/mainStoreContext";
import { createAuthStore, createInternalEventsStore } from "../utils/mocks/storeMocks";
import useEvent from "@testing-library/user-event";

import StyledAppBar from "./StyledAppBar";

describe("<StyledAppBar />", () => {
    it("should render heading 'Adote um PIX'", () => {
        const { getByRole } = getRenderer({});
        expect(getByRole("heading", { name: "Adote um PIX" })).toBeInTheDocument();
    });

    it.each(["Perfil", "Sair"])("should render button '%s' if user is Authenticated and not Anonymous", (expected) => {
        const user = { name: "Example" };

        const { getByRole } = getRenderer({ user });
        expect(getByRole("button", { name: expected })).toBeInTheDocument();
    });

    it("should render button 'Entre' if user is not Authenticated or Anonymous", () => {
        const { getByRole } = getRenderer({});
        expect(getByRole("button", { name: "Entre" })).toBeInTheDocument();
    });

    it("should render LoginForm if clicked button 'Entre'", () => {
        const { getByRole, queryByRole } = getRenderer({});
        expect(queryByRole("heading", { name: "Email" })).not.toBeInTheDocument();

        useEvent.click(getByRole("button", { name: "Entre" }));
        expect(queryByRole("heading", { name: "Email" })).toBeInTheDocument();
    });
});

function getRenderer({ user }) {
    return render(
        <MainStoreContext.Provider
            value={{ authStore: createAuthStore({ user }), internalEventsStore: createInternalEventsStore() }}
        >
            <MemoryRouter>
                <StyledAppBar />
            </MemoryRouter>
        </MainStoreContext.Provider>
    );
}
