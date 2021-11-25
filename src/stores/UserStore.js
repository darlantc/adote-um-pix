class UserStore {
    getUser;

    constructor(getUser) {
        this.getUser = getUser;
    }

    getUserProfile = async (id) => {
        try {
            const userProfile = await this.getUser(id);
            return userProfile;
        } catch (error) {
            console.log("Error", error);
            return null;
        }
    };
}

export default UserStore;
