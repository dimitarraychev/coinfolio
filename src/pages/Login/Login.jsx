import React, { useState } from "react";
import { Link } from "react-router-dom";

import "./Login.css";
import loginImg from "../../assets/images/login-register.svg";
import loginIcon from "../../assets/icons/login-icon.svg";
import arrowRight from "../../assets/icons/arrow-right.svg";
import Button from "../../components/Button/Button";

const Login = () => {
	const [inputs, setInputs] = useState({});
	const [rememberMe, setRememberMe] = useState(false);

	const handleChange = (event) => {
		const name = event.target.name;
		const value = event.target.value;
		setInputs((values) => ({ ...values, [name]: value }));
	};

	const handleRememberMeChange = () => {
		setRememberMe(!rememberMe);
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		console.log(inputs);
	};

	return (
		<section className="login">
			<form onSubmit={handleSubmit}>
				<h2 className="page-header">
					<img src={loginIcon} alt="login" />
					Login
				</h2>

				<label htmlFor="email">Email:</label>
				<input
					type="email"
					name="email"
					id="email"
					className="form-input"
					autoComplete="email"
					placeholder="Your email address..."
					value={inputs.email || ""}
					onChange={handleChange}
				/>

				<label htmlFor="password">Password:</label>
				<input
					type="password"
					name="password"
					id="password"
					className="form-input"
					autoComplete="current-password"
					placeholder="Set your password..."
					value={inputs.password || ""}
					onChange={handleChange}
				/>
				<div className="actions-wrapper">
					<div className="remember-me">
						<input
							type="checkbox"
							id="remember-me"
							checked={rememberMe}
							onChange={handleRememberMeChange}
						/>
						<label htmlFor="remember-me">Remember me</label>
					</div>

					<p>Forgot Password?</p>
				</div>

				<Button text="sign in" svg={arrowRight} isWide={true} />

				<p className="link">
					Don't have an account?{" "}
					<Link to={"/register"}>
						<span>Register</span>
					</Link>
				</p>
			</form>

			<img src={loginImg} alt="login" className="login-img" />
		</section>
	);
};

export default Login;
