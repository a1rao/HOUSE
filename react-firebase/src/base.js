import firebase from "firebase";
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyDNBMO0XY7lFl9vye30nmh8MNiyuo5lSZQ",
    authDomain: "houseapp-62b1b.firebaseapp.com",
    databaseURL: "https://houseapp-62b1b.firebaseio.com",
    projectId: "houseapp-62b1b",
    storageBucket: "houseapp-62b1b.appspot.com",
    messagingSenderId: "310216559573",
    appId: "1:310216559573:web:c64f960484dc297b"
};

const app = firebase.initializeApp(firebaseConfig);

export default app;
