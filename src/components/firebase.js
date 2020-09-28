import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
	apiKey: "AIzaSyAo2DrvO-RbIu3yAi4pRlXjty7TST932WI",
  authDomain: "todo-app-tutorial-b4250.firebaseapp.com",
  databaseURL: "https://todo-app-tutorial-b4250.firebaseio.com",
  projectId: "todo-app-tutorial-b4250",
  storageBucket: "todo-app-tutorial-b4250.appspot.com",
  messagingSenderId: "326580929907",
  appId: "1:326580929907:web:4fe73384523ac0c1827106",
  measurementId: "G-X6WGB02CYP"
});

const db = firebaseApp.firestore();
// const auth = firebase.auth();
// const storage = firebase.storage();

export default db;