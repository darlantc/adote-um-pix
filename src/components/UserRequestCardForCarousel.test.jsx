import { render } from "@testing-library/react";
import { MainStoreContext } from "../contexts/mainStoreContext";
import { createUserRequestStore, createInternalEventsStore } from "../utils/mocks/storeMocks";

import UserRequestCardForCarousel from "./UserRequestCardForCarousel";
import { formatDate } from "../utils/formatting";

describe("<UserRequestCardForCarousel />", () => {
    it.each(["Random description", "Another description"])("should render a p tag '%s'", (expected) => {
        const request = { description: expected };

        const { getByText } = getRenderer({ request });
        expect(getByText(expected)).toBeInTheDocument();
    });

    it.each([
        [1620276521252, "06/05/2021"],
        ["1620299923252", "06/05/2021"],
    ])("should render a heading formatted from a timestamp'%s'", (timestamp, generatedDate) => {
        const request = { createdAt: timestamp };

        const { getByText } = getRenderer({ request });

        const formattedDate = formatDate(timestamp);
        expect(getByText(formattedDate)).toBeInTheDocument();

        expect(getByText(generatedDate)).toBeInTheDocument();
    });

    it.each(["email@teste.com", "(71) 9 9999-9999"])("should render a heading containing pixKey", (expected) => {
        const request = { pixKey: expected };
        const { getByText } = getRenderer({ request });

        expect(getByText(`Chave: ${expected}`)).toBeInTheDocument();
    });

    it.each(["Editar Solicitação", "Editar Solicitação"])("should render a button '%s'", (expected) => {
        const request = { pixKey: "Sample" };
        const { getByRole } = getRenderer({ request });

        expect(getByRole("button", { name: expected })).toBeInTheDocument();
    });
});

function getRenderer({ request, get, add, update, remove }) {
    return render(
        <MainStoreContext.Provider
            value={{
                userRequestStore: createUserRequestStore({ get, add, update, remove }),
                internalEventsStore: createInternalEventsStore(),
            }}
        >
            <UserRequestCardForCarousel request={request} />
        </MainStoreContext.Provider>
    );
}
