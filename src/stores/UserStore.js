class UserStore {
    get;

    constructor(get) {
        this.get = get;
    }

    getUserProfile = async (id) => {
        try {
            const userProfile = await this.get(id);
            console.log("🚀 ~ file: UserStore.js ~ line 11 ~ UserStore ~ getUserProfile= ~ userProfile", userProfile);
            return userProfile;
        } catch (error) {
            return null;
        }
    };
}

export default UserStore;
