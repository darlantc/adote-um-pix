import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { MainStoreContext } from "../contexts/mainStoreContext";
import { createAuthStore, createInternalEventsStore } from "../utils/mocks/storeMocks";

import Profile from "./Profile";

describe("<Profile />", () => {
    it("should have heading with page title", () => {
        const { getByRole } = getRenderer({});
        expect(getByRole("heading", { name: "Perfil" })).toBeInTheDocument();
    });

    it.each([
        [{ photoUrl: "true", name: "true", linkedIn: "true" }, 75],
        [{}, 0],
    ])("should display user engagement according to number of truly properties in '%s'", (userProfile, engagement) => {
        const { getByLabelText } = getRenderer({ userProfile });
        expect(getByLabelText("Taxa do potencial do seu perfil")).toHaveAttribute("aria-valuenow", `${engagement}`);
    });

    it.each([
        ["Alto", { photoUrl: "true", name: "true", linkedIn: "true", bio: "true" }],
        ["Bom", { photoUrl: "true", name: "true", bio: "true" }],
        ["Moderado", { photoUrl: "true", bio: "true" }],
        ["Baixo", {}],
    ])("should have heading with engagement level '%s'", (engagementLevel, userProfile) => {
        const { getByText } = getRenderer({ userProfile });
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

    it("should display ProfileInfo component", () => {
        const { getByTestId } = getRenderer({});
        expect(getByTestId("ProfileInfo")).toBeInTheDocument();
    });
});

function getRenderer({ userProfile }) {
    return render(
        <MainStoreContext.Provider
            value={{ authStore: createAuthStore({ userProfile }), internalEventsStore: createInternalEventsStore() }}
        >
            <MemoryRouter>
                <Profile />
            </MemoryRouter>
        </MainStoreContext.Provider>
    );
}
