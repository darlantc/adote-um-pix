import { render } from "@testing-library/react";
import useEvent from "@testing-library/user-event";

import { MainStoreContext } from "../../contexts/mainStoreContext";
import { createAuthStore } from "../../utils/mocks/storeMocks";
import { emailValidation, phoneValidation } from "../../utils/validation";

import LoginForm from "./LoginForm";

describe("<LoginForm />", () => {
    it("should display loading animation if displayEmailRedirectOptions === 'loading.'", () => {
        const { getByAltText } = getRenderer({ displayEmailRedirectOptions: "loading" });
        expect(getByAltText("Animação de Carregamento")).toBeInTheDocument();
    });

    it("should render EmailRedirectOptions if 'displayEmailRedirectOptions' is truly.", () => {
        const { getByText } = getRenderer({ displayEmailRedirectOptions: true });
        expect(getByText("Obrigado! Agora por favor abra o link que enviamos para seu e-mail.")).toBeInTheDocument();
    });

    it("should flip to render form if 'Voltar' button on EmailRedirectOptions is clicked.", () => {
        const { getByText, getByRole, queryByText } = getRenderer({ displayEmailRedirectOptions: true });

        expect(getByText("Obrigado! Agora por favor abra o link que enviamos para seu e-mail.")).toBeInTheDocument();

        useEvent.click(getByRole("button", { name: "Voltar" }));
        expect(
            queryByText("Obrigado! Agora por favor abra o link que enviamos para seu e-mail.")
        ).not.toBeInTheDocument();
    });

    it.each(["Email", "Telefone"])("should render a '%s' heading.", (expected) => {
        const { getByRole } = getRenderer({});
        expect(getByRole("heading", { name: expected })).toBeInTheDocument();
    });

    it.each(["email", "phone"])("should render a input and allow users to type '%s'.", (expected) => {
        const { getByLabelText } = getRenderer({ expected });
        const input = getByLabelText(expected);
        expect(input).toContainHTML("");

        useEvent.type(input, expected);
        expect(input).toContainHTML(expected);
    });

    it.each(["email-login", "phone-login"])("should have a button for '%s'.", (expected) => {
        const { getByLabelText } = getRenderer({});
        expect(getByLabelText(expected)).toBeInTheDocument();
    });

    it("should display error message if invalid email is used for login.", () => {
        const { getByRole, queryByText, getByText, getByLabelText } = getRenderer({});
        const errorMessage = "O email digitado parece não ser válido.";
        expect(queryByText(errorMessage)).not.toBeInTheDocument();

        const input = getByRole("heading", { name: "Email" }).nextElementSibling;
        useEvent.type(input, "invalidEmail@test");

        useEvent.click(getByLabelText("email-login"));
        expect(getByText(errorMessage)).toBeInTheDocument();
    });

    it("should display error message if invalid phone is used for login.", () => {
        const { getByRole, queryByText, getByText, getByLabelText } = getRenderer({});
        const errorMessage = "O número digitado parece não ser válido.";
        expect(queryByText(errorMessage)).not.toBeInTheDocument();

        const input = getByRole("heading", { name: "Telefone" }).nextElementSibling;
        useEvent.type(input, "invalidPhoneNumber");

        useEvent.click(getByLabelText("phone-login"));
        expect(getByText(errorMessage)).toBeInTheDocument();
    });
});

function getRenderer({ user, displayEmailRedirectOptions }) {
    return render(
        <MainStoreContext.Provider value={{ authStore: createAuthStore({ user, displayEmailRedirectOptions }) }}>
            <LoginForm />
        </MainStoreContext.Provider>
    );
}
