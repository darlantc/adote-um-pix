import { action, computed, makeObservable, observable } from "mobx";

import { InternalEvents } from "./InternalEventsStore";

class UserRequestStore {
    get;
    getByUrl;
    add;
    update;
    remove;
    userRequests = [];
    isFetching = false;
    searchString = "";

    constructor(get, getByUrl, add, update, remove, InternalEvents) {
        this.get = get;
        this.getByUrl = getByUrl;

        this.add = add;
        this.update = update;
        this.remove = remove;
        this.internalEventsStore = InternalEvents;

        makeObservable(this, {
            userRequests: observable,
            isFetching: observable,
            searchString: observable,
            filteredUserRequests: computed,
            setSearchString: action,
            setUserRequests: action,
            setIsFetching: action,
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

    setIsFetching = (newValue) => {
        this.isFetching = newValue;
    };

    getUserRequests = async () => {
        this.setIsFetching(true);
        const result = await this.get();
        if (result) {
            this.setUserRequests(result);
        }
        this.setIsFetching(false);
    };

    getSpecificUserRequest = async (url) => {
        try {
            const request = await this.getByUrl(url);
            return request;
        } catch (error) {
            return null;
        }
    };

    addUserRequest = async (item) => {
        await this.add(item);
        await this.getUserRequests();

        this.internalEventsStore.notify({
            event: InternalEvents.notification,
            params: { type: "success", message: "Solicitação adicionada!" },
        });
    };

    updateUserRequest = async (item) => {
        if (this.itemExists(item.id)) {
            await this.update(item);
            await this.getUserRequests();

            this.internalEventsStore.notify({
                event: InternalEvents.notification,
                params: { type: "success", message: "Solicitação atualizada!" },
            });
        }
    };

    removeUserRequest = async (id) => {
        await this.remove(id);
        await this.getUserRequests();

        this.internalEventsStore.notify({
            event: InternalEvents.notification,
            params: { type: "success", message: "Solicitação excluída!" },
        });
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
