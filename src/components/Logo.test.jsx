import { render } from "@testing-library/react";
import Logo from "./Logo";

describe("<Logo />", () => {
    it("should render a img logo", () => {
        const { getByAltText } = getRenderer();
        expect(getByAltText("logo")).toHaveStyle({
            margin: 10,
            width: 40,
            height: 40,
            objectFit: "cover",
        });
    });
});

function getRenderer() {
    return render(<Logo />);
}
