import { render } from "@testing-library/react";
import { MainStoreContext } from "../contexts/mainStoreContext";
import { createUserRequestStore } from "../utils/mocks/storeMocks";

import UserRequestCardForCarousel from "./UserRequestCardForCarousel";

describe("<UserRequestCardForCarousel />", () => {
    it.each(["Random description", "Another description"])("should render a p tag '%s'", (expected) => {
        const request = { description: expected };

        const { getByText } = getRenderer(request);
        expect(getByText(expected)).toBeInTheDocument();
    });
});

function getRenderer({ request, get, add, update, remove }) {
    return render(
        <MainStoreContext
            value={{
                userRequestStore: createUserRequestStore({ get, add, update, remove }),
            }}
        >
            <UserRequestCardForCarousel request={request} />
        </MainStoreContext>
    );
}
