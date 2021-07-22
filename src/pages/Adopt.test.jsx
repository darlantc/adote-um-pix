import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { MainStoreContext } from "../contexts/mainStoreContext";
import { createUserRequestStore } from "../utils/mocks/storeMocks";

import Adopt from "./Adopt";

describe("<Adopt />", () => {
    it("should have heading with page title", () => {
        const { getByRole } = getRenderer({});
        expect(getByRole("heading", { name: "Adote" })).toBeInTheDocument();
    });

    it.only.each([" Nenhuma solicitação encontrada, retorne mais tarde."])(
        "should render heading '%s' if userRequests.length < 1",
        (expected) => {
            const { getByRole } = getRenderer({});
            expect(getByRole("heading", { name: expected })).toBeInTheDocument();
        }
    );

    it.only.each([" Nenhuma solicitação encontrada, retorne mais tarde."])(
        "should not render heading '%s' if userRequests.length >= 1",
        (expected) => {
            const sampleUserRequest = { name: "Sample" };
            const { getByRole } = getRenderer({ sampleUserRequest });

            expect(getByRole("heading", { name: expected })).not.toBeInTheDocument();
        }
    );
});

function getRenderer({ get, add, update, remove, sampleUserRequest }) {
    return render(
        <MainStoreContext.Provider
            value={{ userRequestStore: createUserRequestStore({ get, add, update, remove, sampleUserRequest }) }}
        >
            <MemoryRouter>
                <Adopt />
            </MemoryRouter>
        </MainStoreContext.Provider>
    );
}
