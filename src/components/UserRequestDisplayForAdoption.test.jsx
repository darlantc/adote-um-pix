import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import UserRequestDisplayForAdoption from "./UserRequestDisplayForAdoption";
import { MainStoreContext } from "../contexts/mainStoreContext";
import { createUserStore } from "../utils/mocks/storeMocks";
import { formatDate } from "../utils/formatting";
import { MemoryRouter } from "react-router";

describe("<UserRequestDisplayForAdoption />", () => {
    it("should have a div element with following style", () => {
        const { getByTestId } = getRenderer({ request: {} });

        expect(getByTestId("UserRequestDisplay")).toHaveStyle({
            backgroundColor: "#00CCFF",
            color: "#FFFFFF",
            borderRadius: "7px",
            border: "2px",
            borderColor: "#0088AA",
            padding: "10px",
            maxWidth: "655px",
            margin: "5px",
            transition: "0.5s",
            cursor: "pointer",
        });
    });

    it.each([
        ["Name Sample", 1626798494],
        ["Second Sample", 1226798494],
    ])("should render both headings '%s' & '%s'", (name, createdAt) => {
        const user = { name };
        const { getByRole } = getRenderer({ request: { user, createdAt } });

        expect(getByRole("heading", { name: name })).toBeInTheDocument();
        expect(getByRole("heading", { name: formatDate(createdAt) })).toBeInTheDocument();
    });

    it.each(["Sample description", "Second sample description"])(
        "should render a '%s' description p tag",
        (expected) => {
            const request = { description: expected };
            const { getByText } = getRenderer({ request });
            expect(getByText(expected)).toBeInTheDocument();
        }
    );

    it.each(["pixKey info not available at first", "other sample text"])(
        "should display a modal if clicked on styled box area, should return to initial state if clicked 'Voltar'.",
        (expected) => {
            const { getByRole, queryByRole, getByTestId } = getRenderer({
                request: { user: {}, pixKey: expected },
            });

            expect(queryByRole("heading", { name: expected })).not.toBeInTheDocument();

            userEvent.click(getByTestId("UserRequestDisplay"));
            expect(getByRole("heading", { name: expected })).toBeInTheDocument();

            userEvent.click(getByRole("button", { name: "Voltar" }));
            expect(queryByRole("heading", { name: expected })).not.toBeInTheDocument();
        }
    );
});

function getRenderer({ request }) {
    return render(
        <MainStoreContext.Provider
            value={{
                userStore: createUserStore({
                    get: jest.fn(() => {
                        return {};
                    }),
                }),
            }}
        >
            <MemoryRouter>
                <UserRequestDisplayForAdoption request={request} />
            </MemoryRouter>
        </MainStoreContext.Provider>
    );
}
