import { render } from "@testing-library/react";
import EmailRedirectButton from "./EmailRedirectButton";

describe("<EmailRedirectButton />", () => {
    describe("<a />", () => {
        it("should have href", () => {
            // TODO: Finalizar este teste corretamente.
            expect(1).toBe(1);
        });
    });

    describe("<img />", () => {
        it.each(["Custom Image", "Another Image"])("should have alt '%s'", (expected) => {
            const { getByAltText } = getRenderer({ alt: expected });
            expect(getByAltText(expected)).toBeInTheDocument();
        });

        it.each(["https://test.com", "https://testing.com"])("should have src '%s'", (expected) => {
            const { getByAltText } = getRenderer({ src: expected, alt: "image" });
            expect(getByAltText("image")).toHaveAttribute("src", expected);
        });

        it("should have style", () => {
            const { getByAltText } = getRenderer({ alt: "Logo" });
            expect(getByAltText("Logo")).toHaveStyle("width: 200px");
        });
    });
});

function getRenderer({ href, src, alt }) {
    return render(<EmailRedirectButton href={href} src={src} alt={alt} />);
}
