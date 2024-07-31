import { useState } from "react";
import { toast } from "react-toastify";

import { resetPassword } from "../api/firebase-auth";
import { inputsErrorHandler } from "../utils/error";

const useResetPassword = ({ email }) => {
	const [isLoading, setIsLoading] = useState(false);

	const resetPasswordHandler = async () => {
		if (isLoading) return;
		setIsLoading(true);

		const inputsError = inputsErrorHandler({ email });
		if (inputsError) {
			toast.error(inputsError);
			setIsLoading(false);
			return;
		}

		try {
			await resetPassword(email);
			toast.success(
				"Success! A password reset link has been sent to your email."
			);
		} catch (error) {
			toast.error("Error! Email address is not valid.");
		} finally {
			setIsLoading(false);
		}
	};

	return {
		resetPasswordHandler,
	};
};

export default useResetPassword;
