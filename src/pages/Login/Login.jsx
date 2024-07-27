import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import loginImg from "../../assets/images/login-register.svg";
import loginIcon from "../../assets/icons/login-icon.svg";
import Button from "../../components/Button/Button";
import useForm from "../../hooks/useForm";
import { login } from "../../api/firebase-auth";
import { auth } from "../../config/firebase";

const Login = () => {
	const { inputs, handleChange } = useForm({
		email: "",
		password: "",
	});
	const [rememberMe, setRememberMe] = useState(true);
	const navigate = useNavigate();

	const handleRememberMeChange = () => {
		setRememberMe(!rememberMe);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			await login(inputs);
			toast.success(
				`Success! Welcome back to CoinFol.io, ${auth.currentUser.displayName}.`
			);
			navigate("/");
		} catch (error) {
			toast.error(`Error! ${error.code}: ${error.message}`);
		}
	};

	return (
		<section className="auth">
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

				<Button text="sign in" type={"submit"} isWide={true} />

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
