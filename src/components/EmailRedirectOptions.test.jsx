import { render } from "@testing-library/react";
import { MainStoreContext } from "../contexts/mainStoreContext";
import { createAuthStore } from "../utils/mocks/storeMocks";

import EmailRedirectOptions from "./EmailRedirectOptions";

beforeEach(() => {
    localStorage.clear();
});

describe("<EmailRedirectOptions />", () => {
    it.each(["Obrigado! Agora por favor abra o link que enviamos para seu e-mail.", "Não é esse email?"])(
        "should have heading '%s'.",
        (expected) => {
            const { getByRole } = getRenderer();
            expect(getByRole("heading", { name: expected })).toBeInTheDocument();
        }
    );

    it("should have a heading with email previously saved in LocalStorage.", () => {
        localStorage.setItem("emailForSignIn", "email@test.com");
        const { getByRole } = getRenderer();

        expect(getByRole("heading", { name: "email@test.com" })).toBeInTheDocument();
    });

    it("should have a button 'Voltar'.", () => {
        const { getByRole } = getRenderer();
        expect(getByRole("button", { name: "Voltar" })).toBeInTheDocument();
    });
});

function getRenderer() {
    return render(
        <MainStoreContext.Provider
            value={{
                authStore: createAuthStore(),
            }}
        >
            <EmailRedirectOptions />
        </MainStoreContext.Provider>
    );
}
