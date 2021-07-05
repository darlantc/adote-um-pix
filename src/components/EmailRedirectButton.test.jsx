import { render } from "@testing-library/react";
import EmailRedirectButton from "./EmailRedirectButton";

describe("<EmailRedirectButton />", () => {
    describe("<a />", () => {
        it.each(["https://google.com", "https://pudim.com"])("should have href '%s'", (expected) => {
            const { getByRole } = getRenderer({ href: expected });
            expect(getByRole("button").closest("a")).toHaveAttribute("href", expected);
        });
    });

    describe("<img />", () => {
        it.each(["Custom Image", "Another Image"])("should have alt '%s'", (expected) => {
            const { getByAltText } = getRenderer({ title: expected });
            expect(getByAltText(expected)).toBeInTheDocument();
        });

        it.each(["https://test.com", "https://testing.com"])("should have src '%s'", (expected) => {
            const { getByAltText } = getRenderer({ image: expected, title: "image" });
            expect(getByAltText("image")).toHaveAttribute("src", expected);
        });

        it("should have style", () => {
            const { getByAltText } = getRenderer({ title: "Logo" });
            expect(getByAltText("Logo")).toHaveStyle("width: 200px");
        });
    });
});

function getRenderer({ href, image, title }) {
    return render(<EmailRedirectButton href={href} image={image} title={title} />);
}
