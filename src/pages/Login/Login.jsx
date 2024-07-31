import React, { useState } from "react";
import { Link } from "react-router-dom";

import loginImg from "../../assets/images/login-register.svg";
import loginIcon from "../../assets/icons/login-icon.svg";

import Button from "../../components/Button/Button";
import ButtonGoogle from "../../components/ButtonGoogle/ButtonGoogle";
import useAuthForm from "../../hooks/useAuthForm";
import { login } from "../../api/firebase-auth";
import useResetPassword from "../../hooks/useResetPassword";

const Login = () => {
	const { inputs, isSubmitting, changeHandler, submitHandler } = useAuthForm(
		{
			email: "",
			password: "",
		},
		login
	);
	const { resetPasswordHandler } = useResetPassword(inputs);
	const [rememberMe, setRememberMe] = useState(true);

	const isSubmitBtnDisabled =
		isSubmitting || inputs.email === "" || inputs.password === "";

	const handleRememberMeChange = () => {
		setRememberMe(!rememberMe);
	};

	return (
		<section className="auth">
			<form onSubmit={submitHandler}>
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
					value={inputs.email}
					onChange={changeHandler}
				/>

				<label htmlFor="password">Password:</label>
				<input
					type="password"
					name="password"
					id="password"
					className="form-input"
					autoComplete="current-password"
					placeholder="Set your password..."
					value={inputs.password}
					onChange={changeHandler}
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

					<p onClick={resetPasswordHandler}>Forgot Password?</p>
				</div>

				<Button
					text="sign in"
					type={isSubmitBtnDisabled ? "button" : "submit"}
					isDisabled={isSubmitBtnDisabled}
				/>

				<ButtonGoogle />

				<p className="link">
					Don't have an account?{" "}
					<Link to={"/register"}>
						<span>Register</span>
					</Link>
				</p>
			</form>

			<img src={loginImg} alt="login" className="auth-img" />
		</section>
	);
};

export default Login;
