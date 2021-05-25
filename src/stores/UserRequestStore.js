import { action, computed, makeObservable, observable } from "mobx";

class UserRequestStore {
  get;
  add;
  update;
  remove;
  userRequests = [];
  searchString = "";

  constructor(get, add, update, remove) {
    this.get = get;
    this.add = add;
    this.update = update;
    this.remove = remove;

    makeObservable(this, {
      userRequests: observable,
      searchString: observable,
      filteredUserRequest: computed,
      setSearchString: action,
      setUserRequests: action,
    });
  }

  get filteredUserRequest() {
    if (this.userRequests.length < 1) {
      return [];
    }

    return this.userRequests.filter((request) => {
      const lowerDescription = request.description.toLowerCase();
      const lowerString = this.searchString.toLowerCase();
      return lowerDescription.indexOf(lowerString) >= 0;
    });
  }

  setSearchString = (newValue) => {
    this.searchString = newValue;
  };

  setUserRequests = (newValue) => {
    this.userRequests = newValue;
  };

  getUserRequests = async () => {
    const result = await this.get();
    this.setUserRequests(result);
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

  clearStore = () => {
    this.setUserRequests([]);
  };
}

export default UserRequestStore;
