import { render } from "@testing-library/react";
import LoadingAnimation from "./LoadingAnimation";

describe("<LoadingAnimation />", () => {
    it("should have a img logo", () => {
        const { getByAltText } = getRenderer();
        expect(getByAltText("Loading Animation")).toHaveStyle("width: 150px");
    });

    it("should have a div container", () => {
        const { getByTestId } = getRenderer();
        expect(getByTestId("div-container")).toHaveStyle(
            "width: 300px; height: 300px; display: flex; justifyContent: center; alignItems: center"
        );
    });
});

function getRenderer() {
    return render(<LoadingAnimation />);
}
