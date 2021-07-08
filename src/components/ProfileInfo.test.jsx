import { render } from "@testing-library/react";
import { MainStoreContext } from "../contexts/mainStoreContext";
import { createAuthStore } from "../utils/mocks/storeMocks";

import ProfileInfo from "./ProfileInfo";

describe("<ProfileInfo />", () => {
    it.each(["http://example.com", "http://photo.com"])("should render user photo '%s'", (expected) => {
        const user = {
            photoUrl: expected,
        };

        const { getByAltText } = getRenderer({ user });
        expect(getByAltText("user")).toHaveAttribute("src", expected);
    });

    it.each(["Magdalena Nitzsche", "Maximilian Rempel"])("should render user name '%s'", (expected) => {
        const user = {
            name: expected,
        };

        const { getByPlaceholderText } = getRenderer({ user });
        expect(getByPlaceholderText("Seu nome completo")).toHaveDisplayValue(expected);
    });

    it.each(["Carpe Diem", "Momentum Beatus"])("should render user bio '%s'", (expected) => {
        const user = {
            bio: expected,
        };

        const { getByPlaceholderText } = getRenderer({ user });
        expect(getByPlaceholderText("Biografia")).toHaveDisplayValue(expected);
    });

    it.each(["linkedIn Sample", "linkedIn Test"])("should render user linkedIn '%s'", (expected) => {
        const user = {
            linkedIn: expected,
        };

        const { getByPlaceholderText } = getRenderer({ user });
        expect(getByPlaceholderText("LinkedIn")).toHaveDisplayValue(expected);
    });

    it("should have a button", () => {
        const { getByRole } = getRenderer({});
        expect(getByRole("button", { name: "Salvar Perfil" })).toBeInTheDocument();
    });
});

function getRenderer({ user }) {
    return render(
        <MainStoreContext.Provider value={{ authStore: createAuthStore({ user }) }}>
            <ProfileInfo />
        </MainStoreContext.Provider>
    );
}
