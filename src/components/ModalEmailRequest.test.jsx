import { render } from "@testing-library/react";
import { MainStoreContext } from "../contexts/mainStoreContext";
import useEvent from "@testing-library/user-event";

import { mockFirebaseService } from "../utils/mocks/storeMocks";

import AuthStore from "../stores/AuthStore";

import ModalEmailRequest from "./ModalEmailRequest";

jest.mock("../services/FirebaseService");

describe("<ModalEmailRequest />", () => {
    it("should not render Component if needEmail is falsy.", () => {
        const { queryByRole } = getRenderer({ needEmail: false });
        expect(queryByRole("heading", { name: "Confirme o seu email:" })).not.toBeInTheDocument();
    });

    it("should have a heading 'Confirme o seu email:'.", () => {
        const { getByRole } = getRenderer({ needEmail: true });
        expect(getByRole("heading", { name: "Confirme o seu email:" })).toBeInTheDocument();
    });

    it("should have a field for writing email.", () => {
        const { getByRole } = getRenderer({ needEmail: true });
        expect(getByRole("textbox", { name: "" })).toBeInTheDocument();
    });

    it.each(["email@exemplo.com", "test2@email.com"])("should allow user to type '%s' in the field.", (expected) => {
        const { getByRole } = getRenderer({ needEmail: true });
        const input = getByRole("textbox");
        expect(input).toHaveDisplayValue("");

        useEvent.type(input, expected);
        expect(input).toHaveDisplayValue(expected);
    });

    it("should call signInWithEmailLink and clean input if user clicks on 'Confirmar' button with valid email.", async () => {
        const isSignInWithEmailLink = jest.fn(() => {
            return true;
        });
        const signInWithEmailLink = jest.fn();

        const { getByRole } = getRenderer({ needEmail: true, isSignInWithEmailLink, signInWithEmailLink });

        useEvent.type(getByRole("textbox"), "valid@email.com");
        useEvent.click(getByRole("button", { name: "Confirmar" }));

        expect(signInWithEmailLink).toBeCalledTimes(1);
        expect(getByRole("textbox")).toContainHTML("");
    });

    it.each(["invalid@email", "", null, false, undefined])(
        "should display an error if user clicks on 'Confirmar' button with '%s' as email.",
        (expected) => {
            const { getByRole, queryByText } = getRenderer({ needEmail: true });
            const errorMessage = "O email digitado não é válido.";
            expect(queryByText(errorMessage)).not.toBeInTheDocument();

            useEvent.type(getByRole("textbox"), expected);
            useEvent.click(getByRole("button", { name: "Confirmar" }));
            expect(queryByText(errorMessage)).toBeInTheDocument();
        }
    );
});

function getRenderer({ user, needEmail, isSignInWithEmailLink, signInWithEmailLink }) {
    return render(
        <MainStoreContext.Provider
            value={{
                authStore: createMockAuthStore({ user, needEmail, isSignInWithEmailLink, signInWithEmailLink }),
            }}
        >
            <ModalEmailRequest />
        </MainStoreContext.Provider>
    );
}

function createMockAuthStore({ user, needEmail, isSignInWithEmailLink, signInWithEmailLink }) {
    const firebaseService = mockFirebaseService({ isSignInWithEmailLink, signInWithEmailLink });
    const authStore = new AuthStore(firebaseService);

    if (user) {
        authStore.setLoggedUser(user);
    }

    if (needEmail) {
        authStore.setNeedEmailForSignIn(true);
    }
    return authStore;
}
