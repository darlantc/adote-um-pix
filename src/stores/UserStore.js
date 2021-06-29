class UserStore {
    get;

    constructor(get) {
        this.get = get;
    }

    getUserProfile = async (id) => {
        try {
            return await this.get(id);
        } catch (error) {
            return null;
        }
    };
}

export default UserStore;
