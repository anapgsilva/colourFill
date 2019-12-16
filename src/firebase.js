// import * as firebase from 'firebase';

import 'firebase/auth';
import 'firebase/database';
import axios from 'axios';

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

  async doCreatePicture(picture, uid) {
    const res = await axios.put(this.db.ref('pictures'), {
      user_id: uid,
      data: picture
    });
    return res.data;
  }

  async doSavePicture(id, events) {

    const res = await axios.patch(this.db.ref(`pictures/${id}`), {
      events: events
    });
    return res.data;
  }

  async doDeletePicture(id) {

    const res = await axios.delete(this.db.ref(`pictures/${id}`));
    return res.data;
  }

  async doGetPicture(id) {
    const res = await axios.get(this.db.ref(`pictures/${id}`));
    return res.data;
  }

  async doGetPictures() {
    const res = await axios.get(this.db.ref('pictures'));
    return res.data;
  }
}


export default Firebase;
