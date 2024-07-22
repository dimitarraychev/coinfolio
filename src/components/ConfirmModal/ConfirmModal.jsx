import React from "react";
import "./ConfirmModal.css";
import Button from "../Button/Button";

const ConfirmModal = ({ onConfirm, onClose }) => {
	const handleWrapperClick = (e) => {
		if (e.target === e.currentTarget) onClose();
	};

	return (
		<div className="modal-overlay" onClick={handleWrapperClick}>
			<div className="modal-wrapper">
				<p>Are you sure you want to delete this portfolio?</p>

				<p>This action is permanent and cannot be undone.</p>
				<div className="btn-wrapper">
					<Button text={"confirm"} onClick={onConfirm} />
					<Button text={"cancel"} isGhost={true} onClick={onClose} />
				</div>
			</div>
		</div>
	);
};

export default ConfirmModal;
