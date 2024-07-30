import { Navigate, Outlet } from "react-router-dom";
import { useCurrentUser } from "../../context/AuthContext";

const ProtectedRoute = () => {
	const { isAuthenticated } = useCurrentUser();
	return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
