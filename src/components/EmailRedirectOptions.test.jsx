import { render } from "@testing-library/react";
import { MainStoreContext } from "../contexts/mainStoreContext";
import { createAuthStore } from "../utils/mocks/storeMocks";
import EmailRedirectOptions from "./EmailRedirectOptions";

describe("<EmailRedirectOptions />", () => {
    it.each(["Obrigado! Agora por favor abra o link que enviamos para seu e-mail.", "Não é esse email?"])(
        "should have heading '%s'",
        (expected) => {
            const { getByRole } = getRenderer();
            expect(getByRole("heading", { name: expected })).toBeInTheDocument();
        }
    );

    it("should have a button 'voltar'", () => {
        const { getByRole } = getRenderer();
        expect(getByRole("button", { name: "Voltar" })).toBeInTheDocument();
    });
});

function getRenderer(user) {
    return render(
        <MainStoreContext.Provider value={{ authStore: createAuthStore({ user }) }}>
            <EmailRedirectOptions />
        </MainStoreContext.Provider>
    );
}
