class UserRequestModel {
    createdAt;
    description;
    userId;
    pixKey;
    status;

    constructor(data) {
        if (
            data &&
            data.hasOwnProperty("createdAt") &&
            data.hasOwnProperty("userId") &&
            data.hasOwnProperty("pixKey") &&
            data.hasOwnProperty("status")
        ) {
            this.createdAt = data.createdAt;
            this.description = data.description;
            this.userId = data.userId;
            this.pixKey = data.pixKey;
            this.status = data.status;
        } else {
            throw new Error("Invalid data");
        }
    }
}

export default UserRequestModel;
