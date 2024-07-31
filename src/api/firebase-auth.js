import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
	updateProfile,
	signInWithPopup,
	sendPasswordResetEmail,
} from "firebase/auth";
import { auth, provider } from "../config/firebase";

export const register = async ({ username, email, password }) => {
	try {
		await createUserWithEmailAndPassword(auth, email, password);
		await updateProfile(auth.currentUser, { displayName: username });
	} catch (error) {
		throw error;
	}
};

export const login = async ({ email, password }) => {
	try {
		await signInWithEmailAndPassword(auth, email, password);
	} catch (error) {
		throw error;
	}
};

export const googleLogin = async () => {
	try {
		await signInWithPopup(auth, provider);
	} catch (error) {
		throw error;
	}
};

export const logout = async () => {
	try {
		await signOut(auth);
	} catch (error) {
		throw error;
	}
};

export const resetPassword = async (email) => {
	try {
		await sendPasswordResetEmail(auth, email);
	} catch (error) {
		throw error;
	}
};
