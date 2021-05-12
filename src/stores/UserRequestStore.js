class UserRequestStore {
  get;
  add;
  update;
  remove;
  userRequests = [];

  constructor(get, add, update, remove) {
    this.get = get;
    this.add = add;
    this.update = update;
    this.remove = remove;
  }

  getUserRequests = async () => {
    const result = await this.get();
    this.userRequests = result;
  };

  addUserRequest = async (item) => {
    await this.add(item);
    await this.getUserRequests();
  };

  updateUserRequest = async (item, key) => {
    await this.update(item, key);
    await this.getUserRequests();
  };

  removeUserRequest = async (key) => {
    await this.remove(key);
    await this.getUserRequests();
  };

  filterUserRequest = (string) => {
    const filteredValues = this.userRequests.filter((request) => {
      const lowerRequest = request.toLowerCase();
      const lowerString = string.toLowerCase();
      return lowerRequest.indexOf(lowerString) >= 0;
    });

    return filteredValues;
  };

  clearStore = () => {
    this.userRequests = [];
  };
}

export default UserRequestStore;
