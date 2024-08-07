import { Navigate, Outlet } from "react-router-dom";

import "./AuthLayout.css";
const authImg =
	"https://firebasestorage.googleapis.com/v0/b/coinfolio-109f2.appspot.com/o/assets%2Flogin-register.svg?alt=media&token=1cb45459-76e6-42f6-b28d-ce1f45c9785a";

import { useAuthContext } from "../../context/AuthContext";
import Loader from "../../components/common/Loader/Loader";

const AuthLayout = () => {
	const { isAuthenticated, isLoading, currentUser } = useAuthContext();

	if (isLoading)
		return (
			<div className="loading loading-80">
				<Loader size={"15rem"} />
			</div>
		);

	return isAuthenticated ? (
		<Navigate to={`/profile/${currentUser.uid}`} />
	) : (
		<section className="auth">
			<Outlet />

			<img src={authImg} alt="auth" className="auth-img" />
		</section>
	);
};

export default AuthLayout;
