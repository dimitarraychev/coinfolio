import { useState, useEffect } from "react";
import { toast } from "react-toastify";

import { getPortfolios } from "../api/firebase-db";

const useGetPorfolios = () => {
	const [portfolios, setPortfolios] = useState([]);
	const [category, setCategory] = useState("newest");
	const [isLoading, setIsLoading] = useState(false);

	const hasNoPortfolios = portfolios.length < 1;

	const getPortfoliosData = async () => {
		setIsLoading(true);
		try {
			const portfolios = await getPortfolios();

			setPortfolios(portfolios);
		} catch (error) {
			toast.error(error);
		} finally {
			setIsLoading(false);
		}
	};

	const changeCategory = (value) => {
		setCategory(value);
	};

	useEffect(() => {
		getPortfoliosData();
	}, [category]);

	return {
		portfolios,
		category,
		isLoading,
		hasNoPortfolios,
		changeCategory,
	};
};

export default useGetPorfolios;
