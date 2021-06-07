import { v4 as uuid } from "uuid";

import UserRequestModel from "../UserRequestModel";
import UserRequestStatus from "../UserRequestStatus";

class UserRequestBuilder {
    model = new UserRequestModel({
        id: uuid(),
        createdAt: new Date().getTime(),
        userId: uuid(),
        pixKey: uuid(),
        status: UserRequestStatus.waitingForApproval,
    });

    static aUserRequest() {
        return new UserRequestBuilder();
    }

    static aExistingUserRequest(id) {
        const builder = new UserRequestBuilder();
        builder.model.id = id;
        return builder;
    }

    withCustomDescription(description) {
        this.model.description = description;
        return this;
    }

    withCustomPixKey(pixKey) {
        this.model.pixKey = pixKey;
        return this;
    }

    withCanceledStatus() {
        this.model.status = UserRequestStatus.canceled;
        return this;
    }
    withAvailableStatus() {
        this.model.status = UserRequestStatus.available;
        return this;
    }
    withPaidStatus() {
        this.model.status = UserRequestStatus.paid;
        return this;
    }

    build() {
        return this.model;
    }
}

export default UserRequestBuilder;