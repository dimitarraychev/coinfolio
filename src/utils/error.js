export const firebaseErrorHandler = (errorCode) => {
	if (errorCode === "auth/invalid-email")
		return "Error! Sorry, email is invalid.";
	if (errorCode === "auth/invalid-credential")
		return "Error! Uh-oh, invalid credentials.";
	if (errorCode === "auth/weak-password")
		return "Error! Oops, password should be at least 6 characters.";
	if (errorCode === "auth/email-already-in-use")
		return "Error! Sorry, this email address is already in use.";
	if (errorCode === "auth/invalid-display-name")
		return "Error! Oops, this username is invalid.";
	if (errorCode === "auth/missing-password")
		return "Error! Oops, Please fill the password field.";

	return "Error! A wild error occurred, please try again.";
};
