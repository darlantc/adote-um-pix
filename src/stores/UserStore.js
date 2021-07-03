class UserStore {
    get;

    constructor(get) {
        this.get = get;
    }

    getUserProfile = (id) => {
        const user = this.get();
        return user;
    };
}

export default UserStore;
