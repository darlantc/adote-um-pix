import { ThemeProvider } from "@material-ui/core/styles";
import { render } from "@testing-library/react";
import ApprovalsPage from "./ApprovalsPage";
import { theme } from "../assets/jss/styles.js";
import UserRequestBuilder from "../models/builders/UserRequestBuilder";
import ChevronRight from "@material-ui/icons/ChevronRight";
import ChevronLeft from "@material-ui/icons/ChevronLeft";

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

    it.each(["Nome da pessoa", "E-mail/Telefone", "Bio:", "Descrição:", "Chave Pix:"])(
        "should have label '%s'",
        (expected) => {
            const { getByText } = getRenderer({ requestsList: [createRequest()] });
            expect(getByText(expected)).toBeInTheDocument();
        }
    );

    it.each(["Aprovar", "Recusar"])("should have a button with label '%s'", (expected) => {
        const { getByRole } = getRenderer({ requestsList: [createRequest()] });
        expect(getByRole("button", { name: expected })).toBeInTheDocument();
    });

    it("should allow user to reject", () => {
        const onReject = jest.fn();
        const { getByRole } = getRenderer({ requestsList: [createRequest()], onReject });

        expect(onReject).not.toBeCalled();

        getByRole("button", { name: "Recusar" }).click();
        getByRole("button", { name: "Recusar" }).click();
        getByRole("button", { name: "Recusar" }).click();
        expect(onReject).toBeCalledTimes(3);
    });

    it("should allow user to approve", () => {
        const onApprove = jest.fn();
        const { getByRole } = getRenderer({ requestsList: [createRequest()], onApprove });

        expect(onApprove).not.toBeCalled();

        getByRole("button", { name: "Aprovar" }).click();
        getByRole("button", { name: "Aprovar" }).click();
        getByRole("button", { name: "Aprovar" }).click();
        expect(onApprove).toBeCalledTimes(3);
    });

    it.each("should allow user to next resquest(card", () => {
        const nextRequest = jest.fn();
        const { getByRole } = getRenderer({ requestsList: [createRequest()], nextRequest });

        expect(nextRequest).not.toBeCalled();

        getByRole("button", { name: ChevronRight }).click();
        getByRole("button", { name: ChevronRight }).click();
        getByRole("button", { name: ChevronRight }).click();
        expect(nextRequest).toBeCalledTimes(3);
    });

    it.each("should allow user to back request(card)", () => {
        const backRequest = jest.fn();
        const { getByRole } = getRenderer({ requestsList: [createRequest()], backRequest });

        expect(backRequest).not.toBeCalled();

        getByRole("button", { name: ChevronLeft }).click();
        getByRole("button", { name: ChevronLeft }).click();
        getByRole("button", { name: ChevronLeft }).click();
        expect(backRequest).toBeCalledTimes(3);
    });

    // it.each(["ChevronRight", "ChevronLeft"])("should have a button with label '%s'", (expected) => {
    //const { getByRole } = getRenderer({
    //    requestsList: [createRequest()],
    // });
    //expect(getByRole("button", { name: expected })).toBeInTheDocument();
    //});

    // TODO: Escrever teste da exibição do index
    // TODO: Escrever testes para os botões de avançar / voltar
});

// Helpers
function getRenderer({ requestsList, onReject, onApprove, nextRequest, backRequest }) {
    return render(
        <ThemeProvider theme={theme}>
            <ApprovalsPage
                requestsList={requestsList}
                onReject={onReject}
                onApprove={onApprove}
                backRequest={backRequest}
                nextRequest={nextRequest}
            />
        </ThemeProvider>
    );
}

function createRequest() {
    return UserRequestBuilder.aUserRequest().build();
}
