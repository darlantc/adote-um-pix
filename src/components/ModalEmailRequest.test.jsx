import { render } from "@testing-library/react";
import { MainStoreContext } from "../contexts/mainStoreContext";
import { createAuthStore } from "../utils/mocks/storeMocks";
import useEvent from "@testing-library/user-event";

import ModalEmailRequest from "./ModalEmailRequest";

describe("<ModalEmailRequest />", () => {
    it("should have a heading", () => {
        const { getByRole } = getRenderer();
        expect(getByRole("heading", { name: "Confirme o seu email:" })).toBeInTheDocument();
    });

    it("should have a field for writing email", () => {
        const { getByRole } = getRenderer();
        expect(getByRole("textbox", { name: "" })).toBeInTheDocument();
    });

    it.each(["email@exemplo.com", "test2@email.com"])("should allow user to type '%s' in the field", (expected) => {
        const { getByRole } = getRenderer();
        const input = getByRole("textbox");
        expect(input).toHaveDisplayValue("");

        useEvent.type(input, expected);
        expect(input).toHaveDisplayValue(expected);
    });

    it("should display an error if user clicks on button with invalid email.", () => {
        const { getByRole, queryByText } = getRenderer();
        const errorMessage = "O email digitado parece não ser válido";
        expect(queryByText(errorMessage)).not.toBeInTheDocument();

        useEvent.click(getByRole("button", { name: "Confirmar" }));
        expect(queryByText(errorMessage)).toBeInTheDocument();
    });
});

function getRenderer(user) {
    return render(
        <MainStoreContext.Provider value={{ authStore: createAuthStore({ user, needEmail: true }) }}>
            <ModalEmailRequest />
        </MainStoreContext.Provider>
    );
}
