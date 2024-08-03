import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { uploadFile } from "../../api/firebase-storage";
import { updateProfileImage } from "../../api/firebase-auth";
import { useAuthContext } from "../../context/AuthContext";

const FileUploader = ({ isOpen, closeUploader }) => {
	const { updateUserData } = useAuthContext();
	const fileInputRef = useRef(null);
	const [isLoading, setIsLoading] = useState(false);

	const handleImageChange = async (e) => {
		if (isLoading) return;
		if (!e.target.files) return;

		const file = e.target.files[0];
		setIsLoading(true);

		try {
			const imageUrl = await uploadFile(file);
			await updateProfileImage(imageUrl);
			updateUserData();
			toast.success("Success! Your new profile image has been uploaded.");
		} catch (error) {
			toast.error(
				"Error! Upload failed, please try again with another file."
			);
		} finally {
			setIsLoading(false);
			closeUploader();
		}
	};

	useEffect(() => {
		if (isOpen) fileInputRef.current.click();
	}, [isOpen]);

	return (
		<input
			type="file"
			accept="image/*"
			ref={fileInputRef}
			style={{ display: "none" }}
			onChange={handleImageChange}
		/>
	);
};

export default FileUploader;
