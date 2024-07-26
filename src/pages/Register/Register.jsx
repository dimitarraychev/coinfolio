import React from "react";
import { Link } from "react-router-dom";

import registerImg from "../../assets/images/login-register.svg";
import registerIcon from "../../assets/icons/register-icon.svg";
import Button from "../../components/Button/Button";
import useForm from "../../hooks/useForm";
import { register } from "../../api/firebase-auth";
import { toast } from "react-toastify";

const Register = () => {
	const { inputs, handleChange } = useForm({
		username: "",
		email: "",
		password: "",
		re_password: "",
	});

	const handleSubmit = async (e) => {
		e.preventDefault();

		const { re_password, ...userData } = inputs;

		if (inputs.password !== re_password) {
			toast.error("Error! Password and repeat password do not match.");
			return;
		}

		try {
			await register(userData);
		} catch (error) {
			toast.error(error);
		}
	};

	return (
		<section className="auth">
			<form onSubmit={handleSubmit}>
				<h2 className="page-header">
					<img src={registerIcon} alt="register" />
					Register
				</h2>

				<label htmlFor="username">Username:</label>
				<input
					type="text"
					name="username"
					id="username"
					className="form-input"
					autoComplete="username"
					placeholder="Your username..."
					value={inputs.username}
					onChange={handleChange}
				/>

				<label htmlFor="email">Email:</label>
				<input
					type="email"
					name="email"
					id="email"
					className="form-input"
					autoComplete="email"
					placeholder="Your email address..."
					value={inputs.email}
					onChange={handleChange}
				/>

				<label htmlFor="password">Password:</label>
				<input
					type="password"
					name="password"
					id="password"
					className="form-input"
					autoComplete="new-password"
					placeholder="Set your password..."
					value={inputs.password}
					onChange={handleChange}
				/>

				<label htmlFor="re_password">Repeat Password:</label>
				<input
					type="password"
					name="re_password"
					id="re_password"
					className="form-input"
					autoComplete="new-password"
					placeholder="Repeat your password..."
					value={inputs.re_password}
					onChange={handleChange}
				/>

				<Button text="sign up" type={"submit"} isWide={true} />

				<p className="link">
					Already have an account?{" "}
					<Link to={"/login"}>
						<span>Log in</span>
					</Link>
				</p>
			</form>

			<img src={registerImg} alt="register" className="auth-img" />
		</section>
	);
};

export default Register;
