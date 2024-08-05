import {
	collection,
	doc,
	addDoc,
	getDoc,
	getDocs,
	query,
	orderBy,
	updateDoc,
	deleteDoc,
	where,
	limit,
} from "firebase/firestore";
import { db } from "../config/firebase";
import { portfolioCategoriesEnum } from "../constants/categories";

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

export const getPortfolios = async (category, userId, page) => {
	const portfoliosRef = collection(db, PORTFOLIOS_COLLECTION_ID);
	const totalLimit = page * 5;
	const limitQuery = limit(totalLimit);

	let queryParams = orderBy("createdOn", "desc");
	switch (category) {
		case portfolioCategoriesEnum.NEWEST:
			queryParams = orderBy("createdOn", "desc");
			break;
		case portfolioCategoriesEnum.POPULAR:
			queryParams = orderBy("createdOn", "desc");
			break;
		case portfolioCategoriesEnum.FOLLOWING:
			queryParams = where("followers", "array-contains", userId);
			break;
		case portfolioCategoriesEnum.OWNED:
			queryParams = where("owner.uid", "==", userId);
			break;
		default:
			queryParams = orderBy("createdOn", "desc");
			break;
	}
	const myQuery = query(portfoliosRef, queryParams, limitQuery);

	try {
		const snapshot = await getDocs(myQuery);
		const reachedLastPage = snapshot.docs.length < totalLimit;
		const portfolios = [];

		snapshot.forEach((doc) => {
			portfolios.push({ id: doc.id, ...doc.data() });
		});

		if (category === portfolioCategoriesEnum.POPULAR)
			portfolios.sort((a, b) => b.followers.length - a.followers.length);

		return { portfolios, reachedLastPage };
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
