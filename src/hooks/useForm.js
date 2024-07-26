import { useState } from "react";

const useForm = (initialInputs) => {
	const [inputs, setInputs] = useState(initialInputs);

	const handleChange = (event) => {
		const { name, value } = event.target;
		setInputs({
			...inputs,
			[name]: value,
		});
	};

	return {
		inputs,
		handleChange,
	};
};

export default useForm;
