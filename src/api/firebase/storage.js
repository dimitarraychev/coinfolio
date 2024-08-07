import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "./config";

export const uploadFile = async (file) => {
	const filePath = "users/" + Date.now() + "_" + file.name;
	const storageRef = ref(storage, filePath);

	try {
		const snapshot = await uploadBytes(storageRef, file);
		const fileUrl = await getDownloadURL(snapshot.ref);

		return fileUrl;
	} catch (error) {
		throw error;
	}
};
