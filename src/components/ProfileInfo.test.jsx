import { render } from "@testing-library/react";
import { MainStoreContext } from "../contexts/mainStoreContext";
import { createAuthStore } from "../utils/mocks/storeMocks";

import ProfileInfo from "./ProfileInfo";

describe("<ProfileInfo />", () => {
    it.each(["http://example.com", "http://photo.com"])("should render user photo '%s'", (expected) => {
        const userProfile = {
            photoUrl: expected,
        };

        const { getByAltText } = getRenderer({ userProfile });
        expect(getByAltText("user")).toHaveAttribute("src", expected);
    });

    it("should have a hidden input type file to receive user photo", () => {
        const { getByAltText } = getRenderer({});
        expect(getByAltText("user").closest("label").firstElementChild).toHaveStyle("display: none");
    });

    it.each(["Magdalena Nitzsche", "Maximilian Rempel"])("should render user name '%s'", (expected) => {
        const userProfile = {
            fullName: expected,
        };

        const { getByPlaceholderText } = getRenderer({ userProfile });
        expect(getByPlaceholderText("Seu nome completo")).toHaveDisplayValue(expected);
    });

    it.each(["Carpe Diem", "Momentum Beatus"])("should render user bio '%s'", (expected) => {
        const userProfile = {
            bio: expected,
        };

        const { getByPlaceholderText } = getRenderer({ userProfile });
        expect(getByPlaceholderText("Biografia")).toHaveDisplayValue(expected);
    });

    it.each([
        ["validexample", "linkedin.com/in/validexample"],
        ["invalid example", "invalid example"],
    ])(
        "should render user linkedIn and complete valid linkedIn adress if user types it partially",
        (expected, result) => {
            const userProfile = {
                linkedIn: expected,
            };

            const { getByPlaceholderText } = getRenderer({ userProfile });
            expect(getByPlaceholderText("LinkedIn")).toHaveDisplayValue(result);
        }
    );

    it("should have a button", () => {
        const { getByRole } = getRenderer({});
        expect(getByRole("button", { name: "Salvar Perfil" })).toBeInTheDocument();
    });
});

function getRenderer({ userProfile }) {
    return render(
        <MainStoreContext.Provider value={{ authStore: createAuthStore({ userProfile }) }}>
            <ProfileInfo />
        </MainStoreContext.Provider>
    );
}
