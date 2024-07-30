import { Navigate, Outlet } from "react-router-dom";
import { useCurrentUser } from "../../context/AuthContext";

const AuthRedirect = () => {
	const { isAuthenticated } = useCurrentUser();
	return isAuthenticated ? <Navigate to="/profile" /> : <Outlet />;
};

export default AuthRedirect;
