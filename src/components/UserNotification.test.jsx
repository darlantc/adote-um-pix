import { render } from "@testing-library/react";
import UserNotification from "./UserNotification";

describe("<UserNotification />", () => {
    it("should have a styled img logo", () => {
        const { getByAltText } = getRenderer({});
        expect(getByAltText("logo")).toHaveStyle("width:30px");
    });

    it.each(["Sample message", "Second sample"])("should have a '%s' heading.", (expected) => {
        const { getByRole } = getRenderer({ message: expected });
        expect(getByRole("heading", { name: expected })).toBeInTheDocument();
    });

    it("should have a styled div container.", () => {
        const { getByAltText } = getRenderer({});
        expect(getByAltText("logo").parentElement).toHaveStyle({
            height: "40px",
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "7px",
            backgroundColor: "#FFFFFF",
            padding: "5px",
        });
    });
});

function getRenderer({ message }) {
    return render(<UserNotification message={message} />);
}
