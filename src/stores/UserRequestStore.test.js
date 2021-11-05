import UserRequestStore from "./UserRequestStore";
import UserRequestBuilder from "../models/builders/UserRequestBuilder";
import { createInternalEventsStore } from "../utils/mocks/storeMocks";

describe("UserRequestStore", () => {
    describe("getUserRequests", () => {
        it("should get specific user requests", async () => {
            const tempList = [
                UserRequestBuilder.aUserRequest().build(),
                UserRequestBuilder.aUserRequest().build(),
                UserRequestBuilder.aUserRequest().build(),
            ];

            const sut = makeSUT(() => tempList);
            await sut.getUserRequests();

            expect(sut.userRequests).toEqual(tempList);
        });
    });

    describe("getUserRequestByUrl", () => {
        it.each(["sample-url", "another-url"])("should return a specific user request", async (expected) => {
            const userRequest = UserRequestBuilder.aUserRequest().withCustomUrl(expected).build();

            const sut = makeSUT(
                () => [],
                () => userRequest
            );
            await sut.getUserRequests();

            expect(sut.getByUrl(expected)).toEqual(userRequest);
        });
    });

    describe("addUserRequest", () => {
        it("should call addCallback with correct item", async () => {
            let response;
            let requestList = [];

            const addCallback = async (item) => {
                response = item;
                requestList.push(item);
            };

            const sut = makeSUT(
                () => requestList,
                async () => {},
                addCallback
            );

            const item1 = UserRequestBuilder.aUserRequest().build();
            await sut.addUserRequest(item1);
            expect(response).toEqual(item1);
            expect(sut.userRequests.includes(item1)).toBe(true);

            const item2 = UserRequestBuilder.aUserRequest().withCustomDescription("Lorem ipsum").build();
            await sut.addUserRequest(item2);
            expect(response).toEqual(item2);
            expect(sut.userRequests.includes(item2)).toBe(true);
        });
    });

    describe("updateUserRequest", () => {
        it("should update a specific value in user requests", async () => {
            let sampleList = [
                UserRequestBuilder.aUserRequest().withCustomDescription("Vini").build(),
                UserRequestBuilder.aUserRequest().withCustomDescription("Vivum").build(),
                UserRequestBuilder.aUserRequest().withCustomDescription("Veritas").build(),
            ];

            let expected = null;

            const updateCallback = async (updatedItem) => {
                expected = updatedItem;
            };
            const sut = makeSUT(
                async () => sampleList,
                async () => {},
                async () => {},
                updateCallback
            );
            await sut.getUserRequests();

            await sut.updateUserRequest(UserRequestBuilder.aUserRequest().build());
            expect(expected).toBe(null);

            const updatedItem = UserRequestBuilder.aExistingUserRequest(sampleList[1].id)
                .withCustomDescription("Beatitudinem")
                .build();
            await sut.updateUserRequest(updatedItem);
            expect(expected).toEqual(updatedItem);
        });
    });

    describe("removeUserRequest", () => {
        it("should remove a specific value from user requests", async () => {
            let sampleList = [
                UserRequestBuilder.aExistingUserRequest(524).build(),
                UserRequestBuilder.aExistingUserRequest(365).build(),
                UserRequestBuilder.aExistingUserRequest(45).build(),
            ];

            let expected = null;
            const removeCallback = async (deletedId) => {
                expected = deletedId;
                sampleList = sampleList.filter(({ id }) => id !== deletedId);
            };

            const sut = makeSUT(
                () => sampleList,
                () => {},
                () => {},
                () => {},
                removeCallback
            );
            await sut.getUserRequests();
            expect(sut.userRequests.length).toBe(3);

            await sut.removeUserRequest(999);
            expect(expected).toBe(999);
            expect(sut.userRequests.length).toBe(3);

            await sut.removeUserRequest(45);
            expect(expected).toBe(45);

            await sut.removeUserRequest(365);
            expect(expected).toBe(365);

            await sut.removeUserRequest(524);
            expect(expected).toBe(524);

            expect(sut.userRequests.length).toBe(0);
        });
    });

    describe("filteredUserRequests", () => {
        it("should return values that match string in user requests", async () => {
            let sampleList = [
                UserRequestBuilder.aUserRequest().withCustomDescription("Beatitudinem").build(),
                UserRequestBuilder.aUserRequest().withCustomDescription("Amare").build(),
                UserRequestBuilder.aUserRequest().withCustomDescription("Magna").build(),
                UserRequestBuilder.aUserRequest().withCustomDescription("Cognitio").build(),
            ];

            const sut = makeSUT(async () => sampleList);
            await sut.getUserRequests();
            expect(sut.userRequests.length).toBe(4);

            sut.setSearchString("MA");
            expect(sut.filteredUserRequests.length).toBe(2);

            sut.setSearchString("a");
            expect(sut.filteredUserRequests.length).toBe(3);

            sut.setSearchString("Cog");
            expect(sut.filteredUserRequests.length).toBe(1);

            sut.setSearchString("Lorem");
            expect(sut.filteredUserRequests.length).toBe(0);
        });
    });

    describe("clearStore", () => {
        it("should empty userRequests", async () => {
            const sut = makeSUT(() => [UserRequestBuilder.aUserRequest().build()]);
            await sut.getUserRequests();
            expect(sut.userRequests.length).toBe(1);

            sut.clearStore();
            expect(sut.userRequests.length).toBe(0);
        });
    });

    // TODO: Garantir que o getByUrl funciona corretamente
});

// Helpers
const makeSUT = (
    get = async () => [],
    getByUrl = async () => {},
    add = async () => {},
    update = async () => {},
    remove = async () => {}
) => {
    return new UserRequestStore(get, getByUrl, add, update, remove, createInternalEventsStore());
};
