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

  doPasswordReset = email =>
    this.auth.sendPasswordResetEmail(email);

  doPasswordUpdate = password =>
    this.auth.currentUser.updatePassword(password);

  //User API
  user = uid => this.db.ref(`users/${uid}`);
  users = () => this.db.ref('users');

  doCreatePicture = (picture) => {
    const uid = this.auth.currentUser.uid;
    const pictureData = picture;
    const newPictureKey = this.db.ref().child('pictures').push().key;

    const updates = {};
    updates['/pictures/'+newPictureKey] = pictureData;
    updates['/user-pictures/'+uid+'/'+newPictureKey] = pictureData;

    this.db.ref().update(updates);
  }

  doSavePicture = (key, events, callback) => {
    const uid = this.auth.currentUser.uid;
    console.log("uid", uid);

    const pictureData = {
      events: events
    }

    const updates = {};
    updates['/pictures/'+key] = pictureData;
    updates['/user-pictures/'+uid+'/'+key] = pictureData;
    const result = this.db.ref().update(updates);
    callback(result);
  }

  doDeletePicture = (key, callback) => {
    const uid = this.auth.currentUser.uid;

    const remove = {};
    remove('/pictures/'+key);
    remove('/user-pictures/'+uid+'/'+key);
    const result = this.db.ref().remove(remove);
    callback(result);
  }

  doGetPicture = (key, callback) => {
    const uid = this.auth.currentUser.uid;

    const picture = this.db.ref('/user-pictures/'+uid+'/'+key);
    picture.on('value', function(snapshot) {
      let result = snapshot.val();
      callback(result);
    })
  }

  doGetPictures = (callback) => {
    let result = [];
    const pictures = this.db.ref('/pictures');
    pictures.on('value', function(snapshot){
      result.push(snapshot.val());
      callback(result);
    })
  }
}


export default Firebase;
