import { ThemeProvider } from "@material-ui/core/styles";
import { render } from "@testing-library/react";
import ApprovalsPage from "./ApprovalsPage";
import { theme } from "../assets/jss/styles.js";

describe("<ApprovalsPage />", () => {
    it("should have a Card", () => {
        const { getByLabelText } = getRenderer();
        expect(getByLabelText("card")).toBeInTheDocument();
    });

    it.each(["Nome da pessoa", "1/97", "E-mail/Telefone", "Bio:", "Descrição:", "Chave Pix:"])(
        "should have label '%s'",
        (expected) => {
            const { getByText } = getRenderer();
            expect(getByText(expected)).toBeInTheDocument();
        }
    );

    it.each(["Aprovar", "Recusar"])("should have a button with label '%s'", (expected) => {
        const { getByRole } = getRenderer();
        expect(getByRole("button", { name: expected })).toBeInTheDocument();
    });
});

function getRenderer() {
    return render(
        <ThemeProvider theme={theme}>
            <ApprovalsPage />
        </ThemeProvider>
    );
}
