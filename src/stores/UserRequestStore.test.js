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

    describe("updateUserRequest", () => {
        it("should update a specific value in user requests", async () => {
            let sampleList = ["Dolore", "Labore", "Magna"];

            const getCallback = async () => sampleList;
            const addCallback = async () => {};
            const updateCallback = async (updatedItem, key) => {
                sampleList[key] = updatedItem;
            };
            const sut = makeSUT(getCallback, addCallback, updateCallback);

            let updatedItem = "Beatitudinem";
            await sut.updateUserRequest(updatedItem, 0);
            expect(sut.userRequests[0]).toEqual(updatedItem);
        });
    });

    describe("removeUserRequest", () => {
        it("should remove a specific value from user requests", async () => {
            let sampleList = ["Beatitudinem", "Labore", "Magna"];

            const getCallback = async () => sampleList;
            const addCallback = async () => {};
            const updateCallback = async () => {};
            const removeCallback = async (key) => {
                const itemRemovedList = sampleList.filter((request) => {
                    return request !== sampleList[key];
                });
                sampleList = [...itemRemovedList];
            };

            const sut = makeSUT(getCallback, addCallback, updateCallback, removeCallback);

            await sut.removeUserRequest(1);
            expect(sut.userRequests.length).toBe(2);

            await sut.removeUserRequest(0);
            expect(sut.userRequests.length).toBe(1);
        });
    });

    describe("filteredUserRequest", () => {
        it("should return the values that match string in user requests", async () => {
            let sampleList = ["Beatitudinem", "Amare", "Magna", "Cognitio"];

            const getCallback = async () => sampleList;

            const sut = makeSUT(getCallback);

            await sut.getUserRequests();

            expect(sut.userRequests.length).toBe(4);

            sut.setSearchString("MA");
            expect(sut.filteredUserRequest.length).toBe(2);

            sut.setSearchString("a");
            expect(sut.filteredUserRequest.length).toBe(3);

            sut.setSearchString("Cog");
            expect(sut.filteredUserRequest.length).toBe(1);
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
const makeSUT = (get = async () => [], add = async () => {}, update = async () => {}, remove = async () => {}) => {
    return new UserRequestStore(get, add, update, remove);
};
