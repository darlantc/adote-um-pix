class UserRequestModel {
    id;
    createdAt;
    description;
    userId;
    pixKey;
    status;

    constructor(data) {
        if (
            data &&
            data.hasOwnProperty("id") &&
            data.hasOwnProperty("createdAt") &&
            data.hasOwnProperty("userId") &&
            data.hasOwnProperty("pixKey") &&
            data.hasOwnProperty("status")
        ) {
            this.id = data.id;
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
