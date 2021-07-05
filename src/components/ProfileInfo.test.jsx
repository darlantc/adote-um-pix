import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { MainStoreContext } from "../contexts/mainStoreContext";
import { createAuthStore } from "../utils/mocks/storeMocks";

import ProfileInfo from "./ProfileInfo";

describe("<ProfileInfo />", () => {
    it.each(["Magdalena Nitzsche", "Maximilian Rempel"])("should render user name '%s'", (expected) => {
        const user = {
            fullName: expected,
        };

        const { getByDisplayValue } = getRenderer({ user });
        expect(getByDisplayValue(expected)).toBeInTheDocument();
    });

    // TODO: Testar os aspectos restantes desse componente
});

function getRenderer({ user }) {
    return render(
        <MainStoreContext.Provider value={{ authStore: createAuthStore({ user }) }}>
            <MemoryRouter>
                <ProfileInfo />
            </MemoryRouter>
        </MainStoreContext.Provider>
    );
}
