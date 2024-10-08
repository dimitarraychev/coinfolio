import { Link } from "react-router-dom";

import registerIcon from "../../../assets/icons/register-icon.svg";

import useAuthForm from "../../../hooks/useAuthForm";
import { register } from "../../../api/firebase/auth";
import Button from "../../../components/common/Button/Button";
import ButtonGoogle from "../../../components/common/ButtonGoogle/ButtonGoogle";

const Register = () => {
	const { inputs, isSubmitting, changeHandler, submitHandler } = useAuthForm(
		{
			username: "",
			email: "",
			password: "",
			re_password: "",
		},
		register
	);

	const isSubmitBtnDisabled =
		isSubmitting ||
		inputs.username === "" ||
		inputs.email === "" ||
		inputs.password === "" ||
		inputs.re_password === "";

	return (
		<form onSubmit={submitHandler}>
			<h2 className="page-header">
				<img src={registerIcon} alt="register" />
				Register
			</h2>
			<p className="auth-subheader">
				Welcome, please fill in your details to proceed
			</p>

			<label htmlFor="username">Username:</label>
			<input
				type="text"
				name="username"
				id="username"
				className="form-input"
				autoComplete="username"
				placeholder="Your username..."
				value={inputs.username}
				onChange={changeHandler}
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
				onChange={changeHandler}
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
				onChange={changeHandler}
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
				onChange={changeHandler}
			/>

			<Button
				text="sign up"
				type={isSubmitBtnDisabled ? "button" : "submit"}
				isDisabled={isSubmitBtnDisabled}
			/>

			<ButtonGoogle />

			<p className="link">
				Already have an account?{" "}
				<Link to={"/login"}>
					<span>Log in</span>
				</Link>
			</p>
		</form>
	);
};

export default Register;
