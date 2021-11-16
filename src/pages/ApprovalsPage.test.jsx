import { v4 as uuid } from "uuid";
import { ThemeProvider } from "@material-ui/core/styles";
import { render, act } from "@testing-library/react";
import { theme } from "../assets/jss/styles.js";

import ApprovalsPage from "./ApprovalsPage";
import { createUserRolesStore, createUserStore } from "../utils/mocks/storeMocks";
import UserRequestBuilder from "../models/builders/UserRequestBuilder";
import { MainStoreContext } from "../contexts/mainStoreContext";

describe("<ApprovalsPage />", () => {
    it("should not present if requestsList is undefined", () => {
        const { queryByLabelText } = getRenderer();
        expect(queryByLabelText("card")).not.toBeInTheDocument();
    });

    it("should present message when the requestsList is empty", () => {
        const { queryByText } = getRenderer();
        expect(queryByText("Não existe nada para avaliar no momento.")).toBeInTheDocument();
    });

    it.only("should have a Card", async () => {
        const getRequests = () => [UserRequestBuilder.aUserRequest().build()];

        const { findByLabelText } = getRenderer({ getRequests });

        expect(await findByLabelText("card")).toBeInTheDocument();
    });

    it.each([[]])("should display count correctly = '%p'", (requestsList) => {
        const { getByText } = getRenderer({ requestsList });
        expect(getByText(`de ${requestsList.length}`)).toBeInTheDocument();
    });

    it.each(["Bio:", "Descrição:", "Chave Pix:"])("should have label '%s'", async (expected) => {
        await act(async () => {
            const { getByText } = getRenderer({ requestsList: [] });
            expect(getByText(expected)).toBeInTheDocument();
        });
    });

    // TODO: Corrigir este teste quebrado após merge
    it.skip.each(["Maria José", "José da Silva"])("should display user name '%s'", async (expected) => {
        await act(async () => {
            const user = {
                id: uuid(),
                fullName: expected,
            };
            const { findByText } = getRenderer({ user, requestsList: [] });
            expect(await findByText(expected)).toBeInTheDocument();
        });
    });

    // TODO: Corrigir este teste quebrado após merge
    it.skip.each([
        ["email", "MariaJose@gmail.com"],
        ["phone", "(11)972835789"],
    ])("should display %s '%s'", async (key, expected) => {
        await act(async () => {
            const user = {
                id: uuid(),
                [key]: expected,
            };
            const { findByText } = getRenderer({ user, requestsList: [] });
            expect(await findByText(expected)).toBeInTheDocument();
        });
    });

    it.each(["Aprovar", "Recusar"])("should have a button with label '%s'", async (expected) => {
        await act(async () => {
            const { getByRole } = getRenderer({ requestsList: [] });
            expect(getByRole("button", { name: expected })).toBeInTheDocument();
        });
    });

    it("should allow user to reject", async () => {
        await act(async () => {
            const onReject = jest.fn();
            const { getByRole } = getRenderer({ requestsList: [] });

            expect(onReject).not.toBeCalled();

            getByRole("button", { name: "Recusar" }).click();
            getByRole("button", { name: "Recusar" }).click();
            getByRole("button", { name: "Recusar" }).click();
            expect(onReject).toBeCalledTimes(3);
        });
    });

    it("should allow user to approve", async () => {
        await act(async () => {
            const onApprove = jest.fn();
            const { getByRole } = getRenderer({});

            expect(onApprove).not.toBeCalled();

            getByRole("button", { name: "Aprovar" }).click();
            getByRole("button", { name: "Aprovar" }).click();
            getByRole("button", { name: "Aprovar" }).click();
            expect(onApprove).toBeCalledTimes(3);
        });
    });

    it("should allow user navigate to next and back to previous request based on index", async () => {
        const { getByText, findByRole, getByLabelText, queryByLabelText } = getRenderer({
            requestsList: [],
        });
        expect(queryByLabelText("Voltar")).not.toBeInTheDocument();
        expect(await findByRole("button", { name: "Aprovar" })).toBeInTheDocument();

        getByLabelText("Avançar").click();
        expect(getByText("2 de 4")).toBeInTheDocument();
        expect(await findByRole("button", { name: "Aprovar" })).toBeInTheDocument();

        getByLabelText("Avançar").click();
        expect(await findByRole("button", { name: "Aprovar" })).toBeInTheDocument();

        getByLabelText("Avançar").click();
        expect(getByText("4 de 4")).toBeInTheDocument();

        expect(await findByRole("button", { name: "Aprovar" })).toBeInTheDocument();

        expect(queryByLabelText("Avançar")).not.toBeInTheDocument();

        const previousButton = await findByLabelText("Voltar");

        previousButton.click();
        expect(getByText("3 de 4")).toBeInTheDocument();

        previousButton.click();
        previousButton.click();
        expect(getByText("1 de 4")).toBeInTheDocument();
        expect(queryByLabelText("Voltar")).not.toBeInTheDocument();
    });
});

function getRenderer({ getRequests, approve, deny, upgrade } = {}) {
    const getDefaultFnUserRequests = () => Promise.resolve(getDefaultUserRequests());
    const getDefaultFnUser = () => Promise.resolve(getDefaultUser());
    return render(
        <MainStoreContext.Provider
            value={{
                userRolesStore: createUserRolesStore({
                    getRequests: getRequests || getDefaultFnUserRequests,
                    approve,
                    deny,
                    upgrade,
                }),
                userStore: createUserStore({ get: getDefaultFnUser }),
            }}
        >
            <ThemeProvider theme={theme}>
                <ApprovalsPage />
            </ThemeProvider>
        </MainStoreContext.Provider>
    );
}

const createRequest = () => jest.fn();

function getDefaultUserRequests() {
    return [UserRequestBuilder.aUserRequest().build(), UserRequestBuilder.aUserRequest().build()];
}

function getDefaultUser() {
    return {
        id: "24537623767237-7623236253",
        fullName: "Orokin Mumu",
    };
}
