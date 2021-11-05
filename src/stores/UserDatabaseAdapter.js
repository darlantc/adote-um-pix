class UserDatabaseAdapter {
    constructor(authStore, firebaseService) {
        this.authStore = authStore;
        this.firebaseService = firebaseService;
    }

    getUser = async (id) => {
        try {
            this.specificUserRef = this.firebaseService.usersRef.child(id);

            const snapshot = await this.specificUserRef.once("value");
            return snapshot.val();
        } catch (error) {
            console.error("UserDatabaseAdapter -> getUser", error);
        }
    };
}

export default UserDatabaseAdapter;
