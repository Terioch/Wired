import firebase from "firebase/app";

const FIREBASE_CONFIG = {
	apiKey: "AIzaSyCD5eknkkZBjwXCoJ5-JeTf8EXSZc8LBWE",
	authDomain: "wired-3d3c9.firebaseapp.com",
	projectId: "wired-3d3c9",
	storageBucket: "wired-3d3c9.appspot.com",
	messagingSenderId: "199564192216",
	appId: "1:199564192216:web:cec606349a9d8b2908eaad",
	measurementId: "G-S1DL5B887P",
};

if (!firebase.apps.length) {
	firebase.initializeApp(FIREBASE_CONFIG);
}
