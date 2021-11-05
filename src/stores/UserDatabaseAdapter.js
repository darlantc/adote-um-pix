class UserDatabaseAdapter {
    get;

    constructor(authStore, firebaseService) {
        this.authStore = authStore;
        this.firebaseService = firebaseService;
    }

    getUser = async (id) => {
        try {
            this.specificUserRef = this.firebaseService.usersRef.child(id);

            const user = await this.specificUserRef.once("value");
            return user;
        } catch (error) {
            console.error("UserDatabaseAdapter -> getUser", error);
        }
    };
}

export default UserDatabaseAdapter;
