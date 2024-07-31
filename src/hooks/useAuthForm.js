import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { auth } from "../config/firebase";
import { firebaseErrorHandler, inputsErrorHandler } from "../utils/error";

const useAuthForm = (initialInputs, onSubmit) => {
	const navigate = useNavigate();

	const [inputs, setInputs] = useState(initialInputs);
	const [isSubmitting, setIsSubmitting] = useState(false);

	const changeHandler = (event) => {
		const { name, value } = event.target;
		setInputs({
			...inputs,
			[name]: value,
		});
	};

	const submitHandler = async (e) => {
		e.preventDefault();

		if (isSubmitting) return;
		setIsSubmitting(true);

		const inputsError = inputsErrorHandler(inputs);
		if (inputsError) {
			toast.error(inputsError);
			setIsSubmitting(false);
			return;
		}

		let userData = { ...inputs };

		if (inputs.re_password) {
			const { re_password, ...cleanInputs } = inputs;
			userData = cleanInputs;
		}

		try {
			await onSubmit(userData);
			const message = inputs.username
				? `Success! Welcome to CoinFol.io, ${inputs.username}.`
				: `Success! Welcome back to CoinFol.io, ${auth.currentUser.displayName}.`;
			toast.success(message);
			navigate("/");
		} catch (error) {
			toast.error(firebaseErrorHandler(error.code));
		} finally {
			setIsSubmitting(false);
		}
	};

	return {
		inputs,
		isSubmitting,
		changeHandler,
		submitHandler,
	};
};

export default useAuthForm;
