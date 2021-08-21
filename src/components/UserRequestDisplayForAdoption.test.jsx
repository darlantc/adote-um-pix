import { render } from "@testing-library/react";

import UserRequestDisplayForAdoption from "./UserRequestDisplayForAdoption";
import { formatDate } from "../utils/formatting";
import { MemoryRouter } from "react-router";

describe("<UserRequestDisplayForAdoption />", () => {
    it("should have base element with following style", () => {
        const request = { name: "Sample" };
        const { getByRole } = getRenderer({ request });

        expect(getByRole("heading", { name: "Sample" }).parentElement).toHaveStyle({
            backgroundColor: "#00CCFF",
            color: "#FFFFFF",
            borderRadius: "7px",
            border: "2px",
            borderColor: "#0088AA",
            padding: "10px",
            maxWidth: "655px",
            margin: "5px",
        });
    });

    it.each([
        ["Name Sample", 1626798494],
        ["Second Sample", 1226798494],
    ])("should render both headings '%s'", (name, timestamp) => {
        const request = { name, timestamp };
        const { getByRole } = getRenderer({ request });

        expect(getByRole("heading", { name: name })).toBeInTheDocument();
        expect(getByRole("heading", { name: formatDate(timestamp) })).toBeInTheDocument();
    });

    it.each(["Sample description", "Second sample description"])(
        "should render a '%s' description p tag",
        (expected) => {
            const request = { description: expected };
            const { getByText } = getRenderer({ request });
            expect(getByText(expected)).toBeInTheDocument();
        }
    );
});

function getRenderer({ request }) {
    return render(
        <MemoryRouter>
            <UserRequestDisplayForAdoption request={request} />
        </MemoryRouter>
    );
}
