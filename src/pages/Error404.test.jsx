import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { ThemeProvider } from "@material-ui/core/styles";
import { theme } from "../assets/jss/styles";

import Error404 from "./Error404";

describe("<Error404 />", () => {
    it.each(["A página que você está procurando não existe.", "Precisa de ajuda?", "Quer ajudar?"])(
        "should render a '%s' heading.",
        (expected) => {
            const { getByRole } = getRenderer();

            expect(getByRole("heading", { name: expected })).toBeInTheDocument();
        }
    );

    it("should render a img with style.", () => {
        const { getByAltText } = getRenderer();

        expect(getByAltText("Página não encontrada")).toHaveStyle({ width: "150px" });
    });

    it("should render a parent div for img with style.", () => {
        const { getByAltText } = getRenderer();

        expect(getByAltText("Página não encontrada").parentElement).toHaveStyle({
            width: "100%",
            height: "250px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: "15px",
            backgroundColor: "rgba(255, 255, 255, 0.5)",
        });
    });

    it.each(["Adote", "Solicite"])("should render '%s' button", (expected) => {
        const { getByRole } = getRenderer();
        expect(getByRole("button", { name: expected })).toBeInTheDocument();
    });
});

function getRenderer() {
    return render(
        <ThemeProvider theme={theme}>
            <MemoryRouter>
                <Error404 />
            </MemoryRouter>
        </ThemeProvider>
    );
}
