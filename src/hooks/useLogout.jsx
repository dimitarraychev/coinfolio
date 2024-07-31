import { useNavigate } from "react-router-dom";
import { useConfirmModalContext } from "../context/ConfirmModalContext";
import { logout } from "../api/firebase-auth";

const useLogout = () => {
	const navigate = useNavigate();
	const { openConfirmModal } = useConfirmModalContext();

	const logoutHandler = () => {
		openConfirmModal(
			"Are you sure you want to sign off from your account?",
			() => logout(navigate)
		);
	};

	return {
		logoutHandler,
	};
};

export default useLogout;
