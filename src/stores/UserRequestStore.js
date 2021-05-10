class UserRequestStore {
  get;
  add;
  update;
  remove;
  filter;
  userRequests = [];

  constructor(get, add, update, remove, filter) {
    this.get = get;
    this.add = add;
    this.update = update;
    this.remove = remove;
    this.filter = filter;
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

  filterUserRequest = async (string) => {
    await this.filter(string);
    await this.getUserRequests();
  };

  clearStore = () => {
    this.userRequests = [];
  };
}

export default UserRequestStore;
