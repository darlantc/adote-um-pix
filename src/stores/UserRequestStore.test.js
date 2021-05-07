import UserRequestStore from "./UserRequestStore";

describe("UserRequestStore", () => {
    describe("getUserRequests", () => {
        it("should get user requests", async () => {
            const sut = makeSUT(() => ["Lorem"]);
            await sut.getUserRequests();

            expect(sut.userRequests.length > 0).toBe(true);
        });

        it("should get specific user requests", async () => {
            const tempList = ["Etiam", "Bibendum", "Tortor"];

            const sut = makeSUT(() => tempList);
            await sut.getUserRequests();

            expect(sut.userRequests).toEqual(tempList);
        });
    });

    describe("addUserRequest", () => {
        it("should call addCallback with correct item", async () => {
            let response;
            let requestList = [];

            const getCallback = async () => requestList;
            const addCallback = async (item) => {
                response = item;
                requestList.push(item);
            };
            const sut = makeSUT(getCallback, addCallback);

            let item = "Dolor";
            await sut.addUserRequest(item);
            expect(response).toEqual(item);
            expect(sut.userRequests[0]).toEqual(item);

            item = "Asit";
            await sut.addUserRequest(item);
            expect(response).toEqual(item);
            expect(sut.userRequests[1]).toEqual(item);
        });
    });

    describe("clearStore", () => {
        it("should empty userRequests", async () => {
            const sut = makeSUT(() => ["Ipsum"]);
            await sut.getUserRequests();

            sut.clearStore();
            expect(sut.userRequests.length).toBe(0);
        });
    });
});

// Helpers
const makeSUT = (get = async () => [], add = async () => {}) => {
    return new UserRequestStore(get, add);
};
