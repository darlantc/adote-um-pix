import { render } from "@testing-library/react";
import { MainStoreContext } from "../contexts/mainStoreContext";
import { createAuthStore } from "../utils/mocks/storeMocks";

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

    it("should have a button", () => {
        const { getByRole } = getRenderer();
        expect(getByRole("button", { name: "Confirmar" })).toBeInTheDocument();
    });
});

function getRenderer(user) {
    return render(
        <MainStoreContext.Provider value={{ authStore: createAuthStore({ user, needEmail: true }) }}>
            <ModalEmailRequest />
        </MainStoreContext.Provider>
    );
}
