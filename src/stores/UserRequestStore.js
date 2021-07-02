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
            filteredUserRequests: computed,
            setSearchString: action,
            setUserRequests: action,
        });
    }

    get filteredUserRequests() {
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
        console.log("🚀 result", result);
        if (result) {
            this.setUserRequests(result);
        }
    };

    addUserRequest = async (item) => {
        await this.add(item);
        await this.getUserRequests();
    };

    updateUserRequest = async (item) => {
        if (this.itemExists(item.id)) {
            await this.update(item);
            await this.getUserRequests();
        }
    };

    removeUserRequest = async (id) => {
        await this.remove(id);
        await this.getUserRequests();
    };

    itemExists = (idToVerify) => {
        if (this.userRequests) {
            return this.userRequests.find(({ id }) => id === idToVerify);
        }
        return false;
    };

    clearStore = () => {
        this.setUserRequests([]);
    };
}

export default UserRequestStore;
