class UserRequestModel {
    id;
    createdAt;
    description;
    user;
    pixKey;
    status;
    url;
    user;

    constructor(data) {
        if (
            data &&
            data.hasOwnProperty("id") &&
            data.hasOwnProperty("createdAt") &&
            data.hasOwnProperty("pixKey") &&
            data.hasOwnProperty("status") &&
            data.hasOwnProperty("url") &&
            data.hasOwnProperty("user") &&
            data.user.hasOwnProperty("id")
        ) {
            this.id = data.id;
            this.createdAt = data.createdAt;
            this.description = data.description;
            this.user = data.user;
            this.pixKey = data.pixKey;
            this.status = data.status;
            this.url = data.url;
            this.user = data.user;
        } else {
            throw new Error("Invalid data");
        }
    }
}

export default UserRequestModel;
