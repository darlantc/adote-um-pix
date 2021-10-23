import { render } from "@testing-library/react";

import UserRequestFullInfoDisplay from "./UserRequestFullInfoDisplay";
import { MainStoreContext } from "../contexts/mainStoreContext";
import { createUserStore, createUserRequestStore } from "../utils/mocks/storeMocks";
import { formatDate } from "../utils/formatting";
import { MemoryRouter } from "react-router";
import UserRequestBuilder from "../models/builders/UserRequestBuilder";

describe("<UserRequestFullInfoDisplay />", () => {
    it("should have a div element with following style", async () => {
        const { findByTestId } = getRenderer({
            userRequest: UserRequestBuilder.aUserRequest().build(),
        });

        expect(await findByTestId("UserRequestFullInfo")).toHaveStyle({
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
        "should render an image either with or without user upload.",
        async (expected) => {
            const { findByAltText } = getRenderer({
                userRequest: UserRequestBuilder.aUserRequest().build(),
                get: () => Promise.resolve({ fullName: "Kehinde Igbo", photoUrl: expected }),
            });

            expect(await findByAltText("Kehinde Igbo")).toHaveStyle({ width: "150px", borderRadius: "50%" });
        }
    );

    it("should render a parent div for user's image with specific style.", async () => {
        const { findByTestId } = getRenderer({
            userRequest: UserRequestBuilder.aUserRequest().build(),
        });

        expect(await findByTestId("UsersInfoDiv")).toHaveStyle({
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
            const { findByRole } = getRenderer({
                userRequest: UserRequestBuilder.aUserRequest().build(),
                get: () => Promise.resolve({ linkedIn: expected }),
            });

            expect(await findByRole("link")).toHaveAttribute("href", expected);
        }
    );

    it.each([
        ["Name Sample", "RandomPixKeySample", 1626798494],
        ["Second Sample", "AnotherRandomPixkey", 1226798494],
    ])("should render headings '%s', '%s' & '%s'", async (name, pixKey, createdAt) => {
        const { findByRole } = getRenderer({
            userRequest: UserRequestBuilder.aUserRequest()
                .withCustomPixKey(pixKey)
                .withCustomCreatedAt(createdAt)
                .build(),
            get: () => Promise.resolve({ fullName: name }),
        });

        expect(await findByRole("heading", { name: name })).toBeInTheDocument();
        expect(await findByRole("heading", { name: pixKey })).toBeInTheDocument();
        expect(await findByRole("heading", { name: formatDate(createdAt) })).toBeInTheDocument();
    });

    it.each([
        ["Sample description", "Sample bio paragraph."],
        ["Another description sample", "Random bio sample."],
    ])("should render  '%s' & '%s'", async (description, bio) => {
        const { findByText } = getRenderer({
            userRequest: UserRequestBuilder.aUserRequest().withCustomDescription(description).build(),
            get: () => Promise.resolve({ bio: bio }),
        });

        expect(await findByText(description)).toBeInTheDocument();
        expect(await findByText(bio)).toBeInTheDocument();
    });

    it.only.each(["Voltar", "Adotar"])("should render a '%s' button", async (expected) => {
        const { findByRole } = getRenderer({});

        expect(await findByRole("button", { name: expected })).toBeInTheDocument();
    });
});

function getRenderer({ get, getByUrl }) {
    const getDefaultFnUser = () => Promise.resolve(getDefaultUser());
    const getDefaultFnUserRequest = () => Promise.resolve(getDefaultUserRequest());
    return render(
        <MainStoreContext.Provider
            value={{
                userStore: createUserStore({
                    get: get || getDefaultFnUser,
                }),
                userRequestStore: createUserRequestStore({
                    getByUrl: getByUrl || getDefaultFnUserRequest,
                }),
            }}
        >
            <MemoryRouter>
                <UserRequestFullInfoDisplay />
            </MemoryRouter>
        </MainStoreContext.Provider>
    );
}

function getDefaultUser() {
    return {
        id: "24537623767237-7623236253",
        fullname: "Orokin Mumu",
    };
}

function getDefaultUserRequest() {
    return UserRequestBuilder.aUserRequest().withCustomUserId("24537623767237-7623236253").build();
}
