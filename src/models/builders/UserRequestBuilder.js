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
  }

  static withCustomPixKey(pixKey) {
    this.model.pixKey = pixKey;
  }

  static withCustomId(id) {
    this.model.id = id;
  }

  static withCanceledStatus() {
    this.status = UserRequestStatus.canceled;
  }
  static withAvailableStatus() {
    this.status = UserRequestStatus.available;
  }
  static withPaidStatus() {
    this.status = UserRequestStatus.paid;
  }

  build() {
    return this.model;
  }
}

export default UserRequestBuilder;
