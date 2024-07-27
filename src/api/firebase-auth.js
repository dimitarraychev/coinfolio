import { auth, provider } from "../config/firebase";
import { toast } from "react-toastify";
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
	updateProfile,
	signInWithPopup,
} from "firebase/auth";

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

export const logout = async (navigate) => {
	try {
		await signOut(auth);

		toast.success(`Success! You have logged out, come back soon.`);
		navigate("/");
	} catch (error) {
		throw error;
	}
};
