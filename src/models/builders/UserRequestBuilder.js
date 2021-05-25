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

  static withCustomDescription(description) {
    this.model.description = description;
    return this;
  }

  static withCustomPixKey(pixKey) {
    this.model.pixKey = pixKey;
    return this;
  }

  static withCustomId(id) {
    this.model.id = id;
    return this;
  }

  static withCanceledStatus() {
    this.model.status = UserRequestStatus.canceled;
    return this;
  }
  static withAvailableStatus() {
    this.model.status = UserRequestStatus.available;
    return this;
  }
  static withPaidStatus() {
    this.model.status = UserRequestStatus.paid;
    return this;
  }

  build() {
    return this.model;
  }
}

export default UserRequestBuilder;
