import { action, computed, makeObservable, observable } from "mobx";

import { InternalEvents } from "./InternalEventsStore";
import RequestForUserRequestsStatus from "../models/RequestForUserRequestsStatus";

class UserRequestStore {
    get;
    add;
    update;
    remove;
    userRequests = [];
    requestForUserRequestsStatus = RequestForUserRequestsStatus.loading;
    searchString = "";

    constructor(get, add, update, remove, InternalEvents) {
        this.get = get;

        this.add = add;
        this.update = update;
        this.remove = remove;
        this.internalEventsStore = InternalEvents;

        makeObservable(this, {
            userRequests: observable,
            searchString: observable,
            requestForUserRequestsStatus: observable,
            filteredUserRequests: computed,
            setSearchString: action,
            setUserRequests: action,
            setRequestForUserRequestsStatus: action,
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

    setRequestForUserRequestsStatus = (newValue) => {
        this.requestForUserRequestsStatus = newValue;
    };

    getUserRequests = async () => {
        this.setRequestForUserRequestsStatus(RequestForUserRequestsStatus.loading);
        const result = await this.get();
        if (result) {
            this.setUserRequests(result);
            this.setRequestForUserRequestsStatus(RequestForUserRequestsStatus.finished);
        } else {
            this.setRequestForUserRequestsStatus(RequestForUserRequestsStatus.noUserRequests);
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
