import { render } from "@testing-library/react";
import CardForUserPromotionDisplay from "./CardForUserPromotionDisplay";

describe("<CardForUserPromotionDisplay />", () => {
    it.each(["100px", "50px"])("should have an un", (imageSize) => {
        const { getByAltText } = getRenderer({ imageSize });
        expect(getByAltText("Imagem de usuário")).toHaveStyle({ width: imageSize });
    });

    it.each([
        ["Sample Name", "Sample Bio"],
        ["George Molon", "Professor e Cantor"],
    ])("should have an un", (fullName, bio) => {
        const { getByText } = getRenderer({ fullName, bio });
        expect(getByText(fullName)).toBeInTheDocument();
        expect(getByText(bio)).toBeInTheDocument();
    });
});

function getRenderer({ fullName, bio, buttonTitle, imageSize }) {
    return render(
        <CardForUserPromotionDisplay fullName={fullName} buttonTitle={buttonTitle} bio={bio} imageSize={imageSize} />
    );
}
