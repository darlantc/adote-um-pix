import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import UserRequestFullInfoDisplay from "./UserRequestFullInfoDisplay";
import { MainStoreContext } from "../contexts/mainStoreContext";
import { createUserStore } from "../utils/mocks/storeMocks";
import { formatDate } from "../utils/formatting";
import { MemoryRouter } from "react-router";

describe("<UserRequestFullInfoDisplay />", () => {
    it.skip("should have a div element with following style", async () => {
        const { getByTestId } = getRenderer({
            request: { user: {} },
            get: jest.fn(() => {
                return {};
            }),
        });

        expect(getByTestId("UserRequestFullInfo")).toHaveStyle({
            backgroundColor: "#00CCFF",
            color: "#FFFFFF",
            borderRadius: "7px",
            border: "2px",
            height: "fit-content",
            width: "100%",
            padding: "10px",
            maxWidth: "655px",
            margin: "5px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
        });
    });

    it.each(["samplephotourl.com", undefined])(
        "should render an image even if user does not have one",
        async (expected) => {
            const getUser = jest.fn(() => {
                return {
                    fullName: "any",
                    photoUrl: expected,
                };
            });

            const { getByAltText } = getRenderer({
                request: { user: {} },
                get: getUser,
            });

            await flushPromises();
            expect(getByAltText("any")).toHaveStyle({ width: "150px", borderRadius: "50%" });
        }
    );

    it("should render a parent div for user's image with specific style.", async () => {
        const { getByAltText } = getRenderer({
            request: { user: {} },
            get: jest.fn(() => {
                return { fullName: "sample" };
            }),
        });

        expect(getByAltText("sample").parentElement).toHaveStyle({
            backgroundColor: "#0088AA",
            borderRadius: "7px",
            width: "96%",
            padding: "10px",
            margin: "5px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
        });
    });

    it.each(["linkedinlinksample.com", "secondlinkedinsample.com"])(
        "should render an link '%s' to users linkedIn profile",
        async (expected) => {
            const getUser = jest.fn(() => {
                return {
                    linkedIn: expected,
                };
            });

            const { getByRole } = getRenderer({
                request: { user: {} },
                get: getUser,
            });

            await flushPromises();
            expect(getByRole("link")).toHaveAttribute("href", expected);
        }
    );

    it.each([
        ["Name Sample", "RandomPixKeySample", 1626798494],
        ["Second Sample", "AnotherRandomPixkey", 1226798494],
    ])("should render headings '%s', '%s' & '%s'", async (name, pixKey, createdAt) => {
        const getUser = jest.fn(() => {
            return {
                fullName: name,
            };
        });

        const { getByRole } = getRenderer({
            request: { user: {}, pixKey: pixKey, createdAt: createdAt },
            get: getUser,
        });

        await flushPromises();
        expect(getByRole("heading", { name: name })).toBeInTheDocument();
        expect(getByRole("heading", { name: pixKey })).toBeInTheDocument();
        expect(getByRole("heading", { name: formatDate(createdAt) })).toBeInTheDocument();
    });

    it.only.each([
        ["Sample description", "Sample bio paragraph."],
        ["Another description sample", "Random bio sample."],
    ])("should render  '%s' & '%s'", async (description, bio) => {
        const getUser = jest.fn(() => {
            return {
                bio: bio,
            };
        });

        const { getByText, findByText } = getRenderer({
            request: { user: {}, description: description },
            get: getUser,
        });

        await flushPromises();
        expect(getByText(description)).toBeInTheDocument();
        expect(await findByText(bio)).toBeInTheDocument();
    });

    it.skip.each(["Voltar", "Adotar"])("should render a '%s' button", async (expected) => {
        const { getByRole } = getRenderer({
            request: { user: {} },
            get: jest.fn(() => {
                return {};
            }),
        });
        expect(getByRole("button", { name: expected })).toBeInTheDocument();
    });
});

function getRenderer({ request, get }) {
    return render(
        <MainStoreContext.Provider
            value={{
                userStore: createUserStore({
                    get,
                }),
            }}
        >
            <MemoryRouter>
                <UserRequestFullInfoDisplay request={request} />
            </MemoryRouter>
        </MainStoreContext.Provider>
    );
}

const flushPromises = () => new Promise(setImmediate);
