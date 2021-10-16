import { action, computed, makeObservable, observable } from "mobx";

import { InternalEvents } from "./InternalEventsStore";

class UserRequestStore {
    get;
    getByUrl;
    add;
    update;
    remove;
    userRequests = [];
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
        if (result) {
            this.setUserRequests(result);
        }
    };

    getSpecificUserRequest = async (url) => {
        try {
            return await this.getByUrl(url);
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
