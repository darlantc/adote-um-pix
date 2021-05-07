class UserRequestStore {
    get;
    add;
    userRequests = [];

    constructor(get, add) {
        this.get = get;
        this.add = add;
    }

    getUserRequests = async () => {
        const result = await this.get();
        this.userRequests = result;
    };

    addUserRequest = async (item) => {
        await this.add(item);
        await this.getUserRequests();
    };

    // TODO: adicionar método de update

    // TODO: adicionar método de delete

    // TODO: adicionar método de filtro textual

    clearStore = () => {
        this.userRequests = [];
    };
}

export default UserRequestStore;
