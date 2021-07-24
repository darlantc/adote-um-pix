import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { MainStoreContext } from "../contexts/mainStoreContext";
import { createUserRequestStore } from "../utils/mocks/storeMocks";

import MyRequests from "./MyRequests";

describe("<MyRequests />", () => {
    it("should have heading with page title", () => {
        const { getByRole } = getRenderer({});
        expect(getByRole("heading", { name: "Minhas Solicitações" })).toBeInTheDocument();
    });

    it.each(["Nenhuma solicitação encontrada."])(
        "should render heading '%s' if userRequests.length < 1",
        (expected) => {
            const { getByRole } = getRenderer({});
            expect(getByRole("heading", { name: expected })).toBeInTheDocument();
        }
    );

    it("should render a button 'Solicite' if userRequests.length < 1", () => {
        const { getByRole } = getRenderer({});
        expect(getByRole("button", { name: "Solicite" })).toBeInTheDocument();
    });

    it.each(["Nenhuma solicitação encontrada."])(
        "should not render heading '%s' if userRequests.length >= 1",
        (expected) => {
            const sampleUserRequest = { id: "sample", name: "Sample" };
            const { queryByRole } = getRenderer({ sampleUserRequest });
            expect(queryByRole("heading", { name: expected })).not.toBeInTheDocument();
        }
    );

    it("should not render a button 'Solicite' if userRequests.length >= 1", () => {
        const sampleUserRequest = { id: "sample", name: "Sample" };
        const { queryByRole } = getRenderer({ sampleUserRequest });
        expect(queryByRole("button", { name: "Solicite" })).not.toBeInTheDocument();
    });
});

function getRenderer({ get, add, update, remove, sampleUserRequest }) {
    return render(
        <MainStoreContext.Provider
            value={{ userRequestStore: createUserRequestStore({ get, add, update, remove, sampleUserRequest }) }}
        >
            <MemoryRouter>
                <MyRequests />
            </MemoryRouter>
        </MainStoreContext.Provider>
    );
}
