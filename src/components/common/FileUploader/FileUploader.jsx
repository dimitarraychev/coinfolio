import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

import { useAuthContext } from "../../../context/AuthContext";
import { uploadFile } from "../../../api/firebase/storage";
import { updateProfileImage } from "../../../api/firebase/auth";

const FileUploader = ({ isOpen, closeUploader }) => {
	const { updateUserData } = useAuthContext();
	const fileInputRef = useRef(null);
	const [isLoading, setIsLoading] = useState(false);

	const handleImageChange = async (e) => {
		if (isLoading || !e.target.files) return;

		const file = e.target.files[0];

		const maxSize = 8 * 1024 * 1024;
		if (file.size > maxSize) {
			toast.error(
				"Error. Image exceeds 8MB, please try again with another one."
			);

			return;
		}

		setIsLoading(true);

		try {
			const imageUrl = await uploadFile(file);

			await updateProfileImage(imageUrl);
			updateUserData();

			toast.success("Success! Your new profile image has been uploaded.");
		} catch (error) {
			toast.error(
				"Error! Upload failed, please try again with another image."
			);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		if (isLoading) {
			closeUploader();
			return;
		}

		if (isOpen) {
			fileInputRef.current.click();
			closeUploader();
		}
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
