import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";

import { getPortfolios } from "../api/firebase-db";
import { useAuthContext } from "../context/AuthContext";
import { portfolioCategoriesEnum } from "../constants/categories";

const useGetPorfolios = () => {
	const [searchParams, setSearchParams] = useSearchParams();
	const category = searchParams.get("category");

	const { currentUser, isAuthenticated } = useAuthContext();
	const [portfolios, setPortfolios] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	const hasNoPortfolios = portfolios.length < 1;

	const hasToLogin =
		!isAuthenticated &&
		(category === portfolioCategoriesEnum.FOLLOWING ||
			category === portfolioCategoriesEnum.OWNED);

	const hasNoFollowing =
		hasNoPortfolios &&
		!hasToLogin &&
		category === portfolioCategoriesEnum.FOLLOWING;

	const hasNoOwned =
		hasNoPortfolios &&
		!hasToLogin &&
		category === portfolioCategoriesEnum.OWNED;

	const getPortfoliosData = async () => {
		setIsLoading(true);
		try {
			const portfolios = await getPortfolios(category, currentUser?.uid);
			setPortfolios(portfolios);
		} catch (error) {
			toast.error(error);
		} finally {
			setIsLoading(false);
		}
	};

	const changeCategory = (value) => {
		if (searchParams.get("category") === value) return;
		setIsLoading(true);
		setSearchParams({ category: value });
	};

	useEffect(() => {
		getPortfoliosData();
	}, [category, isAuthenticated]);

	return {
		portfolios,
		category,
		isLoading,
		hasNoPortfolios,
		hasToLogin,
		hasNoFollowing,
		hasNoOwned,
		changeCategory,
	};
};

export default useGetPorfolios;
