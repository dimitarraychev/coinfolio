import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";

import { getPortfolios } from "./db";
import { useAuthContext } from "../../context/AuthContext";
import { portfolioCategoriesEnum } from "../../constants/categories";

const useGetPorfolios = (defaultCategory) => {
	const [searchParams, setSearchParams] = useSearchParams();
	const category = searchParams.get("category");

	const { currentUser, isAuthenticated } = useAuthContext();
	const [portfolios, setPortfolios] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [page, setPage] = useState(1);
	const [isLastPage, setIsLastPage] = useState(false);

	const changePage = (value) => {
		if (!isLoading) setPage(value);
	};

	const hasNoPortfolios = portfolios.length < 1;

	const hasToLogin =
		!isAuthenticated &&
		(category === portfolioCategoriesEnum.FOLLOWING ||
			category === portfolioCategoriesEnum.OWNED);

	const hasNoFollowing =
		hasNoPortfolios &&
		!hasToLogin &&
		(category === portfolioCategoriesEnum.FOLLOWING ||
			(!category &&
				defaultCategory === portfolioCategoriesEnum.FOLLOWING));

	const hasNoOwned =
		hasNoPortfolios &&
		!hasToLogin &&
		(category === portfolioCategoriesEnum.OWNED ||
			(!category && defaultCategory === portfolioCategoriesEnum.OWNED));

	const getPortfoliosData = async () => {
		setIsLoading(true);

		try {
			const { portfolios, reachedLastPage } = await getPortfolios(
				category || defaultCategory,
				isAuthenticated ? currentUser.uid : "",
				page
			);

			setIsLastPage(reachedLastPage);
			setPortfolios(portfolios);
		} catch (error) {
			toast.error(error.message);
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
	}, [category, page, isAuthenticated]);

	return {
		portfolios,
		category,
		isLoading,
		hasNoPortfolios,
		hasToLogin,
		hasNoFollowing,
		hasNoOwned,
		isLastPage,
		changeCategory,
		changePage,
	};
};

export default useGetPorfolios;
