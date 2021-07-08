import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { MainStoreContext } from "../contexts/mainStoreContext";
import { createAuthStore } from "../utils/mocks/storeMocks";

import Profile from "./Profile";

describe("<Profile />", () => {
    it("should have heading with page title", () => {
        const { getByRole } = getRenderer({});
        expect(getByRole("heading", { name: "Perfil" })).toBeInTheDocument();
    });

    it.each([
        [{ photoUrl: "true", name: "true", linkedIn: "true" }, 75],
        [{}, 0],
    ])("should display user engagement accordind to number of truly properties in '%s'", (user, engagement) => {
        const { getByDisplayValue } = getRenderer({ user });
        expect(getByDisplayValue(engagement)).toBeInTheDocument();
    });

    it.each([
        ["Alto", { photoUrl: "true", name: "true", linkedIn: "true", bio: "true" }],
        ["Bom", { photoUrl: "true", name: "true", bio: "true" }],
        ["Moderado", { photoUrl: "true", bio: "true" }],
        ["Baixo", {}],
    ])("should have heading with engagement level '%s'", (engagementLevel, user) => {
        const { getByText } = getRenderer({ user });
        expect(getByText(`Engajamento: ${engagementLevel}`)).toBeInTheDocument();
    });

    it("should have a paragraph", () => {
        const { getByText } = getRenderer({});
        expect(
            getByText(
                /o preenchimento dos campos do seu perfil possibilitam um maior engajamento do nosso time de doadores, preencha todos os campos e deixe que eles te conheçam melhor!/i
            )
        ).toBeInTheDocument();
    });

    it.each(["Solicitações", "Contribuições"])("should have a button '%s'", (expected) => {
        const { getByRole } = getRenderer({});
        expect(getByRole("button", { name: expected })).toBeInTheDocument();
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
