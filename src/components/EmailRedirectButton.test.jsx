import { render } from "@testing-library/react";
import EmailRedirectButton from "./EmailRedirectButton";

describe("<EmailRedirectButton />", () => {
    it("should have an img logo", () => {
        const { getByTestId } = getRenderer();
        expect(getByTestId("logo")).toHaveStyle("width: 200px");
    });
});

function getRenderer() {
    return render(<EmailRedirectButton />);
}
