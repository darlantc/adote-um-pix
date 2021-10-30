class UserStore {
    get;

    constructor(get) {
        this.get = get;
    }

    getUserProfile = async (id) => {
        try {
            const userProfile = await this.get(id);
            return userProfile;
        } catch (error) {
            return null;
        }
    };
}

export default UserStore;
