// import * as firebase from 'firebase';

import 'firebase/auth';
import 'firebase/database';
const firebase = require('firebase/app');


const config = {
  apiKey: "AIzaSyDxBjtBDgf1GWDTAUKxQgiCmthbpHQ5ubg",
  authDomain: "colourfill.firebaseapp.com",
  databaseURL: "https://colourfill.firebaseio.com",
  projectId: "colourfill",
  storageBucket: "colourfill.appspot.com",
  messagingSenderId: "1067746591585",
  appId: "1:1067746591585:web:713c10a0713570e0ebfb20",
  measurementId: "G-43B5WH1R9B"
}

firebase.initializeApp(config);


class Firebase {
  constructor() {
    // firebase.initializeApp(config);
    this.auth = firebase.auth();
    this.db = firebase.database();

  }

  // *** Auth API ***
  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  doSignOut = () => this.auth.signOut();

  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

  doPasswordUpdate = password =>
    this.auth.currentUser.updatePassword(password);

  //User API
  user = uid => this.db.ref(`users/${uid}`);
  users = () => this.db.ref('users');

}


export default Firebase;
