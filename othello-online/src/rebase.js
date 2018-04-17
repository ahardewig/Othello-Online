// Import rebase, database, and auth
import Rebase from "re-base";
import firebase from "firebase/app";
import database from "firebase/database";
import "firebase/auth";

// App object for firebase configuration
const app = firebase.initializeApp({
    apiKey: "AIzaSyCHvO3fZvbkzXnMiI3hokchBmTD7iTvrKk",
    authDomain: "othello-online-f05c9.firebaseapp.com",
    databaseURL: "https://othello-online-f05c9.firebaseio.com",
    projectId: "othello-online-f05c9",
    storageBucket: "othello-online-f05c9.appspot.com",
    messagingSenderId: "325928329106"
});

// const db = database(app);
const rebase = Rebase.createClass(app.database());

// export app, google, or base defaultly
export const auth = app.auth(); 
export const google = new firebase.auth.GoogleAuthProvider();
export default rebase;