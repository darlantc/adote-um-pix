import { render, screen } from "@testing-library/react";

import UserRequestDisplayForAdoption from "./UserRequestDisplayForAdoption";
import { MainStoreContext } from "../contexts/mainStoreContext";
import { createUserStore } from "../utils/mocks/storeMocks";
import { formatDate } from "../utils/formatting";
import { MemoryRouter } from "react-router";

describe("<UserRequestDisplayForAdoption />", () => {
    it("should have a div element with following style", () => {
        getRenderer({ request: {} });

        expect(screen.getByTestId("UserRequestDisplay")).toHaveStyle({
            backgroundColor: "#00CCFF",
            color: "#FFFFFF",
            borderRadius: "7px",
            border: "2px",
            borderColor: "#0088AA",
            padding: "10px",
            maxWidth: "580px",
            maxHeight: "400px",
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
        getRenderer({ request: { user, createdAt } });

        expect(screen.getByRole("heading", { name: name })).toBeInTheDocument();
        expect(screen.getByRole("heading", { name: formatDate(createdAt) })).toBeInTheDocument();
    });

    it.each(["Sample description", "Second sample description"])(
        "should render a '%s' description p tag",
        (expected) => {
            const request = { description: expected };
            getRenderer({ request });
            expect(screen.getByText(expected)).toBeInTheDocument();
        }
    );

    it.each([
        "Sample description with more than 600 cgaracters. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse sed sodales leo, ut suscipit urna. Vestibulum ullamcorper massa vitae luctus sollicitudin. Aenean nisl mauris, rutrum id nibh nec, pretium mattis metus. Nunc pellentesque, mi vel molestie tincidunt, augue nisl consectetur est, id consectetur justo ante non elit. Proin ullamcorper nisl eu nisl ultricies fringilla. Cras tincidunt tortor at blandit semper. Aenean convallis ante mauris, at congue ex molestie a. Sed ac vestibulum elit. Integer faucibus nulla aliquet turpis faucibus fringilla.",
    ])("should render an extra heading '...' if description has more than 600 characters", (expected) => {
        const request = { description: expected };
        getRenderer({ request });
        expect(screen.getByRole("heading", { name: "..." })).toBeInTheDocument();
    });
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
