import { render } from "@testing-library/react";
import Logo from "./Logo";

describe("<Logo />", () => {
    it("should render a img logo", () => {
        const { getByAltText } = getRenderer();
        expect(getByAltText("logo")).toHaveStyle({
            margin: "10px",
            width: "40px",
            height: "40px",
            objectFit: "cover",
        });
    });
});

function getRenderer() {
    return render(<Logo />);
}
