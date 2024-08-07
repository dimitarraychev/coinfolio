import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
	updateProfile,
	signInWithPopup,
	sendPasswordResetEmail,
} from "firebase/auth";
import { auth, logAnalyticsEvent, provider } from "./config";

export const register = async ({ username, email, password }) => {
	try {
		await createUserWithEmailAndPassword(auth, email, password);
		await updateProfile(auth.currentUser, { displayName: username });
		logAnalyticsEvent("sign_up", { method: "Password" });
	} catch (error) {
		throw error;
	}
};

export const login = async ({ email, password }) => {
	try {
		await signInWithEmailAndPassword(auth, email, password);
		logAnalyticsEvent("login", { method: "Password" });
	} catch (error) {
		throw error;
	}
};

export const googleLogin = async () => {
	try {
		await signInWithPopup(auth, provider);
		logAnalyticsEvent("login", { method: "Google" });
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

export const updateProfileImage = async (imageUrl) => {
	try {
		await updateProfile(auth.currentUser, { photoURL: imageUrl });
	} catch (error) {
		throw error;
	}
};
