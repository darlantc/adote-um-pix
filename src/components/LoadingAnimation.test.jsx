import { render } from "@testing-library/react";
import LoadingAnimation from "./LoadingAnimation";

describe("<LoadingAnimation />", () => {
    it("should have a img logo", () => {
        const { getByAltText } = getRenderer();
        expect(getByAltText("Animação de Carregamento")).toHaveStyle("width: 150px");
    });

    it("should have a div container", () => {
        const { getByAltText } = getRenderer();
        expect(getByAltText("Animação de Carregamento").closest("div")).toHaveStyle({
            width: "300px",
            height: "300px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
        });
    });
});

function getRenderer() {
    return render(<LoadingAnimation />);
}
