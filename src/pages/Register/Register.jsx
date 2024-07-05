import React, { useState } from "react";
import { Link } from "react-router-dom";

import "./Register.css";
import registerImg from "../../assets/images/login-register.svg";
import registerIcon from "../../assets/icons/register-icon.svg";
import arrowRight from "../../assets/icons/arrow-right.svg";
import Button from "../../components/Button/Button";

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
				<div className="header-wrapper">
					<img src={registerIcon} alt="rankings" />
					<h2>Register</h2>
				</div>

				<label htmlFor="username">Username:</label>
				<input
					type="text"
					name="username"
					placeholder="Your username..."
					value={inputs.username || ""}
					onChange={handleChange}
				/>

				<label htmlFor="email">Email:</label>
				<input
					type="email"
					name="email"
					placeholder="Your email address..."
					value={inputs.email || ""}
					onChange={handleChange}
				/>

				<label htmlFor="password">Password:</label>
				<input
					type="password"
					name="password"
					placeholder="Set your password..."
					value={inputs.password || ""}
					onChange={handleChange}
				/>

				<label htmlFor="re_password">Repeat Password:</label>
				<input
					type="number"
					name="re_password"
					placeholder="Repeat your password..."
					value={inputs.re_password || ""}
					onChange={handleChange}
				/>

				<Button text="sign up" svg={arrowRight} isWide={true} />
				<p className="link">
					Already have an account?{" "}
					<Link to={"/login"}>
						<span>Log in</span>
					</Link>
				</p>
			</form>
			<img src={registerImg} alt="register" className="register-img" />
		</section>
	);
};

export default Register;
