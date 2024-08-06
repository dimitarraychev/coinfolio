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

export const inputsErrorHandler = (inputs) => {
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

	if (!inputs.email) return "Error! Oops, Email is required.";

	if (!emailRegex.test(inputs.email))
		return "Error! Sorry, email is invalid.";

	if (inputs.password && inputs.password.length < 6)
		return "Error! Oops, password should be at least 6 characters.";

	if (inputs.re_password && inputs.password !== inputs.re_password)
		return "Error! Uh-oh, password and repeat password do not match.";

	if (
		inputs.username &&
		(inputs.username.length < 3 || inputs.username.length > 33)
	)
		return "Error! Sorry, username should be between 3 and 33 characters.";

	return null;
};
