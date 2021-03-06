import firebase from "firebase/app";
import firebaseApp from "firebase";
import "firebase/database";
import "firebase/auth";
import "firebase/storage";

class FirebaseService {
    auth;
    database;
    authParam;

    constructor() {
        if (!firebase.apps.length) {
            firebase.initializeApp({
                apiKey: "AIzaSyAF8-2zuEaR0Ky0scnebEYJgOpMCYOsToM",
                authDomain: "adote-um-pix.firebaseapp.com",
                databaseURL: "https://adote-um-pix-default-rtdb.firebaseio.com",
                projectId: "adote-um-pix",
                storageBucket: "adote-um-pix.appspot.com",
                messagingSenderId: "77821970309",
                appId: "1:77821970309:web:515dd79a309364e6b6e6ec",
                measurementId: "G-8B71FRRB0D",
            });
        }

        this.auth = firebase.auth(); //the Firebase auth namespace
        this.authParam = firebaseApp.auth;
        this.database = firebase.database(); //the real-time database
        this.storage = firebase.storage();
    }

    get rootRef() {
        return this.database.ref();
    }

    get serverTimestamp() {
        return firebase.database.ServerValue.TIMESTAMP;
    }

    get usersRef() {
        return this.database.ref("users");
    }

    get userRequestsRef() {
        return this.database.ref("userRequests");
    }

    get RecaptchaVerifier() {
        return firebaseApp.auth.RecaptchaVerifier;
    }
}

export default FirebaseService;
