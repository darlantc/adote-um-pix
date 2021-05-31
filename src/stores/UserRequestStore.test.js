import UserRequestStore from "./UserRequestStore";
import UserRequestBuilder from "../models/builders/UserRequestBuilder";

describe("UserRequestStore", () => {
  describe("getUserRequests", () => {
    it("should get user requests", async () => {
      const sut = makeSUT(() => [UserRequestBuilder.aUserRequest().build()]);
      await sut.getUserRequests();

      expect(sut.userRequests.length > 0).toBe(true);
    });

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

      let item = UserRequestBuilder.aUserRequest().build();
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
      let sampleList = [
        UserRequestBuilder.aUserRequest()
          .withCustomId(60)
          .withCustomDescription("Vini")
          .build(),
        UserRequestBuilder.aUserRequest()
          .withCustomId(11)
          .withCustomDescription("Vivum")
          .build(),
        UserRequestBuilder.aUserRequest()
          .withCustomId(234)
          .withCustomDescription("Veritas")
          .build(),
      ];

      const getCallback = async () => sampleList;
      const addCallback = async () => {};
      const updateCallback = async (updatedItem, value) => {
        const position = sampleList.findIndex((item) => {
          item.id === value;
        });
        sampleList = sampleList.splice(position, 1, updatedItem);
      };
      const sut = makeSUT(getCallback, addCallback, updateCallback);

      await sut.getUserRequests();
      expect(sut.userRequests.length).toBe(3);

      const updatedItem = UserRequestBuilder.aUserRequest()
        .withCustomId(11)
        .withCustomDescription("Beatitudinem")
        .build();

      await sut.updateUserRequest(updatedItem, 11);
      expect(sut.userRequests[1].description).toBe("Beatitudinem");
    });
  });

  describe("removeUserRequest", () => {
    it("should remove a specific value from user requests", async () => {
      let sampleList = [
        UserRequestBuilder.aUserRequest().withCustomId(524).build(),
        UserRequestBuilder.aUserRequest().withCustomId(365).build(),
        UserRequestBuilder.aUserRequest().withCustomId(45).build(),
      ];

      const getCallback = async () => sampleList;
      const addCallback = async () => {};
      const updateCallback = async () => {};
      const removeCallback = async (id) => {
        const itemRemovedList = sampleList.filter((request) => {
          return request.id !== id;
        });
        sampleList = [...itemRemovedList];
      };

      const sut = makeSUT(
        getCallback,
        addCallback,
        updateCallback,
        removeCallback
      );

      await sut.removeUserRequest(45);
      expect(sut.userRequests.length).toBe(2);

      await sut.removeUserRequest(524);
      expect(sut.userRequests[0].id).toBe(365);
    });
  });

  describe("filteredUserRequest", () => {
    it("should return values that match string in user requests", async () => {
      let sampleList = [
        UserRequestBuilder.aUserRequest()
          .withCustomDescription("Beatitudinem")
          .build(),
        UserRequestBuilder.aUserRequest()
          .withCustomDescription("Amare")
          .build(),
        UserRequestBuilder.aUserRequest()
          .withCustomDescription("Magna")
          .build(),
        UserRequestBuilder.aUserRequest()
          .withCustomDescription("Cognitio")
          .build(),
      ];

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
      const sut = makeSUT(() => [UserRequestBuilder.aUserRequest().build()]);
      await sut.getUserRequests();

      expect(sut.userRequests.length).toBe(1);

      sut.clearStore();
      expect(sut.userRequests.length).toBe(0);
    });
  });
});

// Helpers
const makeSUT = (
  get = async () => [],
  add = async () => {},
  update = async () => {},
  remove = async () => {}
) => {
  return new UserRequestStore(get, add, update, remove);
};
