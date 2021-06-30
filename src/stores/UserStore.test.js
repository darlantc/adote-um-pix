import UserStore from "./UserStore";

describe("UserStore", () => {
    describe("getUserProfile", () => {
        it("should user get callback", async () => {
            const getCallback = jest.fn();
            const sut = makeSUT({ get: getCallback });
            expect(getCallback).not.toBeCalled();

            await sut.getUserProfile();
            await sut.getUserProfile();
            expect(getCallback).toBeCalledTimes(2);
        });

        it("should return null if get callback returns a error", async () => {
            const sut = makeSUT({
                get: jest.fn(() => {
                    throw new Error();
                }),
            });

            const response = await sut.getUserProfile("abc");
            expect(response).toBeNull();
        });

        it("should return user data if get callback return it", async () => {
            const user = {
                id: "abc",
                name: "User Test",
            };

            const sut = makeSUT({
                get: jest.fn(() => user),
            });

            const response = await sut.getUserProfile("abc");
            expect(response).toEqual(user);
        });

        it.each(["abc", "bca"])("should use param 'id=%s' when calling get callback", async (paramId) => {
            let expected = null;
            function getCallback(id) {
                expected = id;
            }

            const sut = makeSUT({
                get: getCallback,
            });
            await sut.getUserProfile(paramId);

            expect(expected).toBe(paramId);
        });
    });
});

function makeSUT({ get }) {
    return new UserStore(get);
}
