import { ThemeProvider } from "@material-ui/core/styles";
import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { theme } from "../assets/jss/styles";
import Homepage from "./Homepage";
import { APP_ROUTES } from "../routes/Routes";

describe("<Homepage />", () => {
    it.each(["Adote um PIX", "Como ajudar?"])("should have heading '%s'", (expected) => {
        const { getByRole } = getRenderer();
        expect(getByRole("heading", { name: expected })).toBeInTheDocument();
    });

    it.each(["Adote", "Solicite"])("should have a button with label '%s'", (expected) => {
        const { getByRole } = getRenderer();
        expect(getByRole("button", { name: expected })).toBeInTheDocument();
    });

    it.each([
        ["Adote", APP_ROUTES.adopt],
        ["Solicite", APP_ROUTES.request],
    ])("button '%s' should have href ='%s'", (label, link) => {
        const { getByRole } = getRenderer();
        expect(getByRole("button", { name: label })).toHaveAttribute("href", link);
    });
});

function getRenderer() {
    return render(
        <ThemeProvider theme={theme}>
            <BrowserRouter>
                <Homepage />
            </BrowserRouter>
        </ThemeProvider>
    );
}
