import { createContext, useContext, useState } from "react";

const ConfirmModalContext = createContext();

export const useConfirmModalContext = () => useContext(ConfirmModalContext);

const ConfirmModalProvider = ({ children }) => {
	const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
	const [confirmModalMessage, setConfirmModalMessage] = useState("");
	const [onConfirmCallback, setOnConfirmCallback] = useState(null);

	const openConfirmModal = (message, onConfirm) => {
		setConfirmModalMessage(message);
		setOnConfirmCallback(() => onConfirm);
		setIsConfirmModalOpen(true);
	};

	const closeConfirmModal = () => {
		setIsConfirmModalOpen(false);
		setConfirmModalMessage("");
		setOnConfirmCallback(null);
	};

	const confirmAction = () => {
		if (onConfirmCallback) {
			onConfirmCallback();
		}
		closeConfirmModal();
	};

	return (
		<ConfirmModalContext.Provider
			value={{
				isConfirmModalOpen,
				confirmModalMessage,
				openConfirmModal,
				closeConfirmModal,
				confirmAction,
			}}
		>
			{children}
		</ConfirmModalContext.Provider>
	);
};

export default ConfirmModalProvider;
