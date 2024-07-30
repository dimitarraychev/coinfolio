import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import Loader from "../Loader/Loader";

const ProtectedRoute = () => {
	const { isAuthenticated, isLoading } = useAuthContext();

	if (isLoading)
		return (
			<div className="loading loading-80">
				<Loader size={"15rem"} />
			</div>
		);

	return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
