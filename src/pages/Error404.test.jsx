import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { ThemeProvider } from "@material-ui/core/styles";
import { theme } from "../assets/jss/styles";

import Error404 from "./Error404";

describe("<Error404 />", () => {
    it.each(["Error 404", "A página que vocês está procurando não existe.", "Precisa de ajuda?", "Quer ajudar?"])(
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

    it.each([
        [
            "Adote",
            {
                backgroundColor: "#0088AA",
                color: "#FFFFFF",
                marginTop: "10px",
            },
        ],
        [
            "Solicite",
            {
                backgroundColor: "#2CA089",
                marginTop: "10px",
            },
        ],
    ])("should render a '%s' button with '%s' style.", (name, style) => {
        const { getByRole } = getRenderer();

        expect(getByRole("button", { name: name })).toHaveStyle(style);
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
