import React from "react";
import "./Register.css";
import registerImg from "../../assets/images/login-register.svg";
import { useState } from "react";

const Register = () => {
	const [inputs, setInputs] = useState({});

	const handleChange = (event) => {
		const name = event.target.name;
		const value = event.target.value;
		setInputs((values) => ({ ...values, [name]: value }));
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		alert(inputs);
	};

	return (
		<section className="register">
			<form onSubmit={handleSubmit}>
				<label>
					Enter your name:
					<input
						type="text"
						name="username"
						value={inputs.username || ""}
						onChange={handleChange}
					/>
				</label>
				<label>
					Enter your age:
					<input
						type="number"
						name="age"
						value={inputs.age || ""}
						onChange={handleChange}
					/>
				</label>
				<input type="submit" />
			</form>
			<img src={registerImg} alt="register" />
		</section>
	);
};

export default Register;
