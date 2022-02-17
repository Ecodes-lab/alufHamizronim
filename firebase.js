// import * as fb from "firebase";
import { initializeApp } from "firebase/app";
import * as database from "firebase/database";
// import "firebase/messaging";
// import { getDatabase, ref, onValue, set, update } from "firebase/database";

// Initialize Firebase
export const firebase = () => {
  const firebaseConfig = {
    // apiKey: "AIzaSyBq0t2MShV5ZYbU5pI31ATu7Yl0zJFkreo",
    // authDomain: "test-6e23c.firebaseapp.com",
    // databaseURL: "https://test-6e23c-default-rtdb.firebaseio.com/",
    // projectId: "alufhamizronim-45222",
    // storageBucket: "test-6e23c.appspot.com",
    // messagingSenderId: "1012705952654",
    // appId: "1:1012705952654:web:b16a46f9050c15c468dadf",
    // measurementId: "G-7Q4XPS9VFN",

    apiKey: "AIzaSyDAv6GO_GZhwv8CxbGo-tcGn5HE8NOrmOM",
    authDomain: "alufhamizronim-45222.firebaseapp.com",
    databaseURL:
      "https://alufhamizronim-45222-default-rtdb.asia-southeast1.firebasedatabase.app/",
    projectId: "alufhamizronim-45222",
    storageBucket: "alufhamizronim-45222.appspot.com",
    messagingSenderId: "1061112272103",
    appId: "1:1061112272103:web:31b8e808c0fbfc6bfafe42",
    measurementId: "G-B0PD0QWJW5",
  };

  initializeApp(firebaseConfig);
};

// export const fb

// export const fcm = () => {
//   messaging.getMessaging().ap
// }

// firebase.;

export default database;
