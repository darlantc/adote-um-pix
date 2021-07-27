import { render } from "@testing-library/react";
import { MainStoreContext } from "../contexts/mainStoreContext";
import { createAuthStore } from "../utils/mocks/storeMocks";
import useEvent from "@testing-library/user-event";

import EmailRedirectOptions from "./EmailRedirectOptions";

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

    it("should stop displaying EmailRedirectOptions Component if button 'Voltar' is clicked.", () => {
        const { getByText, getByRole, queryByText } = getRenderer();

        expect(getByText("Obrigado! Agora por favor abra o link que enviamos para seu e-mail.")).toBeInTheDocument();

        useEvent.click(getByRole("button", { name: "Voltar" }));
        expect(
            queryByText("Obrigado! Agora por favor abra o link que enviamos para seu e-mail.")
        ).not.toBeInTheDocument();
    });
});

function getRenderer(user) {
    return render(
        <MainStoreContext.Provider value={{ authStore: createAuthStore({ user }) }}>
            <EmailRedirectOptions />
        </MainStoreContext.Provider>
    );
}
