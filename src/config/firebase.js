import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
	apiKey: "AIzaSyAn-9Ourkf8F-7BWuNkHMUQxe_VyPFYbkk",
	authDomain: "coinfolio-109f2.firebaseapp.com",
	projectId: "coinfolio-109f2",
	storageBucket: "coinfolio-109f2.appspot.com",
	messagingSenderId: "709338014181",
	appId: "1:709338014181:web:847699798b7c2cf43c4f0c",
	measurementId: "G-MRSBNL4WKW",
};

// const analytics = getAnalytics(app);
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
