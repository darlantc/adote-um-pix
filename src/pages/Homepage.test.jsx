import { ThemeProvider } from "@material-ui/core/styles";
import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { theme } from "../assets/jss/styles";
import Homepage from "./Homepage";
import { APP_ROUTES } from "../routes/Routes";

describe("<Homepage />", () => {
    it.each([
        "Adote um PIX",
        "Aproximando grandes corações e boas oportunidades.",
        "Como obter ajuda?",
        "Como ajudar?",
    ])("should have heading '%s'", (expected) => {
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

    it.each([
        "Está precisando daquele empurrãozinho para voltar ao mercado de trabalho? Compartilhe a sua necessidade conosco. Nós da Adote um PIX acolhemos e conectamos a sua história com alguém que pode te ajudar.",
        "Está com disponibilidade financeira e o coração aberto para contribuir com aquele salve que pode mudar a trajetória de alguém? Faça parte do nosso time de padrinhos PIX. Com certeza tem alguém aqui acreditando em você.",
    ])("should have a paragraph '%s'", (expected) => {
        const { getByText } = getRenderer();
        expect(getByText(expected)).toBeInTheDocument();
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
