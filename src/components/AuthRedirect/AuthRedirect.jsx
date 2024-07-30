import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import Loader from "../Loader/Loader";

const AuthRedirect = () => {
	const { isAuthenticated, isLoading } = useAuthContext();

	if (isLoading)
		return (
			<div className="loading loading-80">
				<Loader size={"15rem"} />
			</div>
		);

	return isAuthenticated ? <Navigate to="/profile" /> : <Outlet />;
};

export default AuthRedirect;
