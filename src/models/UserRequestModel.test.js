import { v4 as uuid } from "uuid";
import UserRequestModel from "./UserRequestModel";

describe("UserRequestModel", () => {
    it("Should throw error if invalid data", () => {
        expect(() => makeSUT()).toThrow("Invalid data");
        expect(() => makeSUT({})).toThrow("Invalid data");
        expect(() => makeSUT({ id: uuid() })).toThrow("Invalid data");
        expect(() => makeSUT({ id: uuid(), createdAt: 1619887317208 })).toThrow("Invalid data");
        expect(() => makeSUT({ id: uuid(), createdAt: 1619887317208, user: { id: "48914" } })).toThrow("Invalid data");
        expect(() =>
            makeSUT({
                id: uuid(),
                createdAt: 1619887317208,
                user: { id: "48914" },
                pixKey: "f7de57ab-ee77-4493-aabc-f819f6b1d0b4",
            })
        ).toThrow("Invalid data");
    });

    it("Should create with valid data", () => {
        expect(
            makeSUT({
                id: uuid(),
                createdAt: 1619887317208,
                description: "lorem ipsum dolor asit amet",
                user: { id: uuid() },
                pixKey: uuid(),
                status: "waitingForApproval",
            })
        ).toBeTruthy();
    });
});

function makeSUT(data) {
    return new UserRequestModel(data);
}
