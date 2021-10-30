import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { MainStoreContext } from "../contexts/mainStoreContext";
import { createUserRequestStore } from "../utils/mocks/storeMocks";

import Adopt from "./Adopt";

describe("<Adopt />", () => {
    it("should render load animation while fetching", () => {
        const { getByAltText } = getRenderer({});
        expect(getByAltText("Animação de Carregamento")).toBeInTheDocument();
    });

    it("should have heading with page title", async () => {
        const { findByRole } = getRenderer({});
        expect(await findByRole("heading", { name: "Adote" })).toBeInTheDocument();
    });

    it("should render heading 'Nenhuma solicitação encontrada, retorne mais tarde.' if userRequests.length < 1", async () => {
        const { findByRole } = getRenderer({});
        expect(
            await findByRole("heading", { name: "Nenhuma solicitação encontrada, retorne mais tarde." })
        ).toBeInTheDocument();
    });

    it("should not render heading 'Nenhuma solicitação encontrada, retorne mais tarde.' if userRequests.length >= 1", () => {
        const sampleUserRequest = { id: "sample", name: "Sample" };
        const { queryByText } = getRenderer({ sampleUserRequest });

        expect(queryByText("Nenhuma solicitação encontrada, retorne mais tarde.")).not.toBeInTheDocument();
    });
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
