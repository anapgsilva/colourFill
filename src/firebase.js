// import * as firebase from 'firebase';
import {FIREBASE_API_KEY, FIREBASE_AUTHDOMAIN, FIREBASE_DATABASE_URL, FIREBASE_PROJECT_ID, FIREBASE_STORAGE_BUCKET, FIREBASE_MESSAGING_SENDER_ID, FIREBASE_APP_ID, FIREBASE_MEASUREMENT_ID} from './.env.js';

import 'firebase/auth';
import 'firebase/database';
import 'firebase/functions';

const firebase = require('firebase/app');

const config = {
  apiKey: FIREBASE_API_KEY,
  authDomain: FIREBASE_AUTHDOMAIN,
  databaseURL: FIREBASE_DATABASE_URL,
  projectId: FIREBASE_PROJECT_ID,
  storageBucket: FIREBASE_STORAGE_BUCKET,
  messagingSenderId: FIREBASE_MESSAGING_SENDER_ID,
  appId: FIREBASE_APP_ID,
  measurementId: FIREBASE_MEASUREMENT_ID
}


class Firebase {
  constructor() {
    firebase.initializeApp(config);
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

  doCreatePicture = (picture, callback) => {
    const uid = this.auth.currentUser.uid;
    const pictureData = picture;
    const newPictureKey = this.db.ref().child('pictures').push().key;

    const updates = {};
    updates['/pictures/'+newPictureKey] = pictureData;
    updates['/user-pictures/'+uid+'/'+newPictureKey] = pictureData;

    this.db.ref().update(updates);
    callback(newPictureKey);
  }

  doSavePicture = (key, picture, callback) => {
    const uid = this.auth.currentUser.uid;
    console.log("uid", uid);

    const updates = {};
    updates['/pictures/'+key] = picture;
    updates['/user-pictures/'+uid+'/'+key] = picture;
    const result = this.db.ref().update(updates);
    callback(result);
  }

  doDeletePicture = (key, callback) => {
    const uid = this.auth.currentUser.uid;

    this.db.ref('/pictures/'+key).remove();
    this.db.ref('/user-pictures/'+uid+'/'+key).remove();
    callback();
  }

  doGetPicture = (key, callback) => {
    const uid = this.auth.currentUser.uid;

    const picture = this.db.ref('/user-pictures/'+uid+'/'+key);
    picture.once('value', function(snapshot) {
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

  doGetImageData  = url => {
    // const dataImage = firebase.functions().httpsCallable('dataImage');
    // dataImage({url: url}).then( (result) => {
    // // Read result of the Cloud Function.
    // console.log("function result");
    // return result.data.url;
    // });

    return fetch("/dataImage", {
      method: 'post',
      body: url,
      headers: {'Content-Type': 'text/plain'}
    }).then( res => res.blob());
  }

}


export default Firebase;
