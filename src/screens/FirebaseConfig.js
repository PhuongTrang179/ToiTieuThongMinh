import * as firebase from 'firebase';

var config = {
    apiKey: "AIzaSyAglFPJhmWy85lwH5E7OY-XuTyqGU31LCM",
    authDomain: "tuoitieuthongminh.firebaseapp.com",
    databaseURL: "https://tuoitieuthongminh.firebaseio.com",
    projectId: "tuoitieuthongminh",
    storageBucket: "tuoitieuthongminh.appspot.com",
    messagingSenderId: "701249994899"
  };
export const firebaseApp =  firebase.initializeApp(config);
