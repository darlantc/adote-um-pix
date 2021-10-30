import { render } from "@testing-library/react";
import useEvent from "@testing-library/user-event";

import { MainStoreContext } from "../../contexts/mainStoreContext";
import { createAuthStore, createUserRequestStore, createInternalEventsStore } from "../../utils/mocks/storeMocks";

import UserRequestForm from "./UserRequestForm";

describe("<UserRequestForm />", () => {
    it.each(["Descreva sua necessidade", "Digite sua chave PIX"])("should have a heading", (expected) => {
        const { getByRole } = getRenderer({});
        expect(getByRole("heading", { name: expected })).toBeInTheDocument();
    });

    it.each(["description", "pixKey"])("should have a an input '%s' and allow users to fill.", (expected) => {
        const { getByLabelText } = getRenderer({});
        const input = getByLabelText(expected);
        expect(input).toContainHTML("");

        useEvent.type(input, expected);
        expect(input).toContainHTML(expected);
    });

    it("should have a formHelperText", () => {
        const { getByText } = getRenderer({});
        expect(
            getByText("Descrever em detalhes pode aumentar suas chances de encontrar um doador para ajuda-lo")
        ).toBeInTheDocument();
    });

    it("should have a button 'Salvar'", () => {
        const { getByRole } = getRenderer({});
        expect(getByRole("button", { name: "Salvar" })).toBeInTheDocument();
    });
});

function getRenderer({ user, get, add, update, remove }) {
    return render(
        <MainStoreContext.Provider
            value={{
                authStore: createAuthStore({ user }),
                internalEventsStore: createInternalEventsStore(),
                userRequestStore: createUserRequestStore({ get, add, update, remove }),
            }}
        >
            <UserRequestForm />
        </MainStoreContext.Provider>
    );
}
