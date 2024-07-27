import { collection, addDoc, doc, getDoc } from "firebase/firestore";
import { db } from "../config/firebase";

const PORTFOLIOS_COLLECTION_ID = "portfolios";

export const postPortfolio = async (portfolio) => {
	try {
		const timestampedPortfolio = {
			...portfolio,
			createdOn: new Date().toISOString(),
			updatedOn: new Date().toISOString(),
		};

		const docRef = await addDoc(
			collection(db, PORTFOLIOS_COLLECTION_ID),
			timestampedPortfolio
		);

		return docRef.id;
	} catch (error) {
		throw error;
	}
};

export const getPortfolio = async (portfolioId) => {
	const docRef = doc(db, PORTFOLIOS_COLLECTION_ID, portfolioId);

	const docSnap = await getDoc(docRef);

	const portfolio = docSnap.exists() ? docSnap.data() : null;

	return portfolio;
};
