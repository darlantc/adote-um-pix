import { v4 as uuid } from "uuid";
import { ThemeProvider } from "@material-ui/core/styles";
import { render, act, waitFor } from "@testing-library/react";
import { theme } from "../assets/jss/styles.js";
import userEvent from "@testing-library/user-event";

import ApprovalsPage from "./ApprovalsPage";
import { createUserRolesStore, createUserStore } from "../utils/mocks/storeMocks";
import UserRequestBuilder from "../models/builders/UserRequestBuilder";
import { MainStoreContext } from "../contexts/mainStoreContext";

describe("<ApprovalsPage />", () => {
    it("should not present if requestsList is undefined", () => {
        const { queryByLabelText } = getRenderer();
        expect(queryByLabelText("card")).not.toBeInTheDocument();
    });

    it("should present message when the requestsList is empty", async () => {
        const { findByText } = getRenderer({
            getRequests: async ()  => []
        });
        expect(await findByText("Não existe nada para avaliar no momento.")).toBeInTheDocument();
    });

    it.skip("should have a Card", async () => {
        const getRequests = () => [UserRequestBuilder.aUserRequest().build()];

        const { findByLabelText } = getRenderer({ getRequests });

        expect(await findByLabelText("card")).toBeInTheDocument();
    });

    it.each([[]])("should display count correctly = '%p'", (requestsList) => {
        const { getByText } = getRenderer({ requestsList });
        expect(getByText(`de ${requestsList.length}`)).toBeInTheDocument();
    });

    it.each(["Bio:", "Descrição:", "Chave Pix:"])("should have label '%s'", (expected) => {
        const { getByText } = getRenderer({ requestsList: [] });
        expect(getByText(expected)).toBeInTheDocument();
    });

    // TODO: Corrigir este teste quebrado após merge
    it.skip.each(["Maria José", "José da Silva"])("should display user name '%s'", async (expected) => {
        const user = {
            id: uuid(),
            fullName: expected,
        };
        const { findByText } = getRenderer({ user, requestsList: [] });
        expect(await findByText(expected)).toBeInTheDocument();
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

    it.each(["Aprovar", "Recusar"])("should have a button with label '%s'", (expected) => {
        const { getByRole } = getRenderer({ requestsList: [] });
        expect(getByRole("button", { name: expected })).toBeInTheDocument();
    });

    it("should allow user to reject", () => {
        const onReject = jest.fn();
        const { getByRole } = getRenderer({ requestsList: [] });

        expect(onReject).not.toBeCalled();

        getByRole("button", { name: "Recusar" }).click();
        getByRole("button", { name: "Recusar" }).click();
        getByRole("button", { name: "Recusar" }).click();
        expect(onReject).toBeCalledTimes(3);
    });

    it("should allow user to approve", () => {
        const onApprove = jest.fn();
        const { getByRole } = getRenderer({});

        expect(onApprove).not.toBeCalled();

        getByRole("button", { name: "Aprovar" }).click();
        getByRole("button", { name: "Aprovar" }).click();
        getByRole("button", { name: "Aprovar" }).click();
        expect(onApprove).toBeCalledTimes(3);
    });

    it("should allow user navigate to the next request", async () => {
        const { findByText, getByLabelText, queryByTestId } = getRenderer({
            getRequests: async () => [
                UserRequestBuilder.aUserRequest().build(),
                UserRequestBuilder.aUserRequest().build(),
                UserRequestBuilder.aUserRequest().build(),
                UserRequestBuilder.aUserRequest().build(),
            ],
        });
        expect(queryByTestId("LoadingAnimation")).toBeInTheDocument();

        await waitFor(() => {
            expect(queryByTestId("LoadingAnimation")).not.toBeInTheDocument();
        });
        expect(await findByText("1 de 4")).toBeInTheDocument();

        userEvent.click(getByLabelText("Avançar"));
        expect(queryByTestId("LoadingAnimation")).toBeInTheDocument();
        expect(await findByText("2 de 4")).toBeInTheDocument();

        userEvent.click(getByLabelText("Avançar"));
        expect(await findByText("3 de 4")).toBeInTheDocument();

        userEvent.click(getByLabelText("Avançar"));
        expect(await findByText("4 de 4")).toBeInTheDocument();

        userEvent.click(getByLabelText("Avançar"));
        expect(await findByText("1 de 4")).toBeInTheDocument();
    });

    it("should allow user navigate to the previous request", async () => {
        const { findByText, getByText, getByLabelText, queryByTestId } = getRenderer({
            getRequests: async () => [
                UserRequestBuilder.aUserRequest().build(),
                UserRequestBuilder.aUserRequest().build(),
                UserRequestBuilder.aUserRequest().build(),
            ],
        });
        expect(queryByTestId("LoadingAnimation")).toBeInTheDocument();

        await waitFor(() => {
            expect(queryByTestId("LoadingAnimation")).not.toBeInTheDocument();
        });
        expect(getByText("1 de 3")).toBeInTheDocument();

        userEvent.click(getByLabelText("Voltar"));
        expect(await findByText("3 de 3")).toBeInTheDocument();

        userEvent.click(getByLabelText("Voltar"));
        expect(await findByText("2 de 3")).toBeInTheDocument();

        userEvent.click(getByLabelText("Voltar"));
        expect(await findByText("1 de 3")).toBeInTheDocument();
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

function getDefaultUserRequests() {
    return [UserRequestBuilder.aUserRequest().build(), UserRequestBuilder.aUserRequest().build()];
}

function getDefaultUser() {
    return {
        id: "24537623767237-7623236253",
        fullName: "Orokin Mumu",
    };
}
