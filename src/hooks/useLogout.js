import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { useConfirmModalContext } from "../context/ConfirmModalContext";
import { logout } from "../api/firebase-auth";

const useLogout = () => {
	const navigate = useNavigate();
	const { openConfirmModal } = useConfirmModalContext();

	const logoutHandler = () => {
		openConfirmModal(
			"Are you sure you want to sign off from your account?",
			initiateLogout
		);
	};

	const initiateLogout = async () => {
		try {
			await logout();
			toast.success(`Success! You have logged out, come back soon.`);
			navigate("/");
		} catch (error) {
			toast.error(`Error! Please try again.`);
		}
	};

	return {
		logoutHandler,
	};
};

export default useLogout;
