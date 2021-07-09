import { v4 as uuid } from "uuid";
import { ThemeProvider } from "@material-ui/core/styles";
import { render, act } from "@testing-library/react";
import ApprovalsPage from "./ApprovalsPage";
import { theme } from "../assets/jss/styles.js";
import UserRequestBuilder from "../models/builders/UserRequestBuilder";
import { createUserStore } from "../utils/mocks/storeMocks";
import { MainStoreContext } from "../contexts/mainStoreContext";

describe("<ApprovalsPage />", () => {
    it("should not present if requestsList is undefined", () => {
        const { queryByLabelText } = getRenderer({});
        expect(queryByLabelText("card")).not.toBeInTheDocument();
    });

    it("should present message when the requestsList is empty", () => {
        const { queryByText } = getRenderer({ requestsList: [] });
        expect(queryByText("Não existe nada para avaliar no momento.")).toBeInTheDocument();
    });

    it("should have a Card", () => {
        const { getByLabelText } = getRenderer({ requestsList: [createRequest()] });
        expect(getByLabelText("card")).toBeInTheDocument();
    });

    it.each([[[createRequest(), createRequest()]], [[createRequest(), createRequest(), createRequest()]]])(
        "should display count correctly = '%p'",
        (requestsList) => {
            const { getByText } = getRenderer({ requestsList });
            expect(getByText(`1 de ${requestsList.length}`)).toBeInTheDocument();
        }
    );

    it.each(["Bio:", "Descrição:", "Chave Pix:"])("should have label '%s'", async (expected) => {
        await act(async () => {
            const { getByText } = getRenderer({ requestsList: [createRequest()] });
            expect(getByText(expected)).toBeInTheDocument();
        });
    });

    it.each(["Maria José", "José da Silva"])("should display user name '%s'", async (expected) => {
        await act(async () => {
            const user = {
                id: uuid(),
                name: expected,
            };
            const { findByText } = getRenderer({ user, requestsList: [createRequest(user)] });
            expect(await findByText(expected)).toBeInTheDocument();
        });
    });

    it.each([
        ["email", "MariaJose@gmail.com"],
        ["phone", "(11)972835789"],
    ])("should display %s '%s'", async (key, expected) => {
        await act(async () => {
            const user = {
                id: uuid(),
                [key]: expected,
            };
            const { findByText } = getRenderer({ user, requestsList: [createRequest(user)] });
            expect(await findByText(expected)).toBeInTheDocument();
        });
    });

    it.each(["Aprovar", "Recusar"])("should have a button with label '%s'", async (expected) => {
        await act(async () => {
            const { getByRole } = getRenderer({ requestsList: [createRequest()] });
            expect(getByRole("button", { name: expected })).toBeInTheDocument();
        });
    });

    it("should allow user to reject", async () => {
        await act(async () => {
            const onReject = jest.fn();
            const { getByRole } = getRenderer({ requestsList: [createRequest()], onReject });

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
            const { getByRole } = getRenderer({ requestsList: [createRequest()], onApprove });

            expect(onApprove).not.toBeCalled();

            getByRole("button", { name: "Aprovar" }).click();
            getByRole("button", { name: "Aprovar" }).click();
            getByRole("button", { name: "Aprovar" }).click();
            expect(onApprove).toBeCalledTimes(3);
        });
    });

    xit("should allow user navigate to next and back to previous request based on index", async () => {
        const { getByText, findByRole, getByLabelText, queryByLabelText } = getRenderer({
            requestsList: [createRequest(), createRequest(), createRequest(), createRequest()],
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

// Helpers
function getRenderer({ requestsList, onReject, onApprove, user }) {
    const userStore = createUserStore({ user });

    return render(
        <MainStoreContext.Provider value={{ userStore }}>
            <ThemeProvider theme={theme}>
                <ApprovalsPage requestsList={requestsList} onReject={onReject} onApprove={onApprove} />
            </ThemeProvider>
        </MainStoreContext.Provider>
    );
}

function createRequest(user) {
    const customUser = user || {
        id: uuid(),
    };
    return UserRequestBuilder.aUserRequest().withCustomUser(customUser).build();
}
