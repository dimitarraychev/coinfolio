import React, { useState } from "react";
import { Link } from "react-router-dom";

import loginIcon from "../../assets/icons/login-icon.svg";
const loginImg =
	"https://firebasestorage.googleapis.com/v0/b/coinfolio-109f2.appspot.com/o/assets%2Flogin-register.svg?alt=media&token=1cb45459-76e6-42f6-b28d-ce1f45c9785a";

import useAuthForm from "../../hooks/useAuthForm";
import useResetPassword from "../../hooks/useResetPassword";
import { login } from "../../api/firebase-auth";
import Button from "../../components/common/Button/Button";
import ButtonGoogle from "../../components/common/ButtonGoogle/ButtonGoogle";

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
				<p className="auth-subheader">
					Welcome back, please enter your credentials
				</p>

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
