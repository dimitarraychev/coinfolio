import { auth } from "../config/firebase";
import { toast } from "react-toastify";
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
	updateProfile,
	onAuthStateChanged,
} from "firebase/auth";

export const register = async ({ username, email, password }) => {
	try {
		await createUserWithEmailAndPassword(auth, email, password);
		await updateProfile(auth.currentUser, { displayName: username });

		toast.success(`Success! Welcome to CoinFol.io, ${username}.`);
	} catch (error) {
		toast.error(`Error! ${error.code}: ${error.message}`);
		throw error;
	}
};

export const login = async ({ email, password }) => {
	try {
		await signInWithEmailAndPassword(auth, email, password);

		toast.success(
			`Success! CoinFol.io welcomes you back, ${auth.currentUser.displayName}.`
		);
	} catch (error) {
		toast.error(`Error! ${error.code}: ${error.message}`);
		throw error;
	}
};

export const logout = async () => {
	try {
		await signOut(auth);

		toast.success(`Success! "You've logged out, come back soon.`);
	} catch (error) {
		toast.error(`Error! ${error.code}: ${error.message}`);
		throw error;
	}
};

export const checkAuth = (callback) => {
	onAuthStateChanged(auth, callback);
};
