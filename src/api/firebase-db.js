import {
	collection,
	doc,
	addDoc,
	getDoc,
	getDocs,
	query,
	orderBy,
	updateDoc,
} from "firebase/firestore";
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

export const getPortfolioById = async (portfolioId) => {
	const docRef = doc(db, PORTFOLIOS_COLLECTION_ID, portfolioId);

	const docSnap = await getDoc(docRef);

	const portfolio = docSnap.exists()
		? { id: docSnap.id, ...docSnap.data() }
		: null;

	return portfolio;
};

export const getPortfolios = async () => {
	const myQuery = query(
		collection(db, PORTFOLIOS_COLLECTION_ID),
		orderBy("createdOn", "desc")
	);

	try {
		const snapshot = await getDocs(myQuery);
		const result = [];

		snapshot.forEach((doc) => {
			result.push({ id: doc.id, ...doc.data() });
		});

		return result;
	} catch (error) {
		throw error;
	}
};

export const updatePortfolio = async (portfolio) => {
	const docRef = doc(db, PORTFOLIOS_COLLECTION_ID, portfolio.id);

	const timestampedPortfolio = {
		...portfolio,
		updatedOn: new Date().toISOString(),
	};

	try {
		const doc = await updateDoc(docRef, timestampedPortfolio);
	} catch (error) {
		throw error;
	}
};

export const deletePortfolio = async (portfolioId) => {
	try {
		await deleteDoc(doc(db, PORTFOLIOS_COLLECTION_ID, portfolioId));
	} catch (error) {
		throw error;
	}
};
