import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";

import useMatchingCoins from "./useMatchingCoins";
import { getPortfolioById } from "../api/firebase-db";

const useGetPorfolioById = () => {
	const { portfolioId } = useParams();
	const navigate = useNavigate();
	const [portfolio, setPortfolio] = useState({
		title: "",
		owner: {
			uid: "",
			displayName: "",
		},
		totalAllocation: {
			usd: 0,
			eur: 0,
		},
		alltimeProfitLoss: 0,
		alltimeProfitLossPercentage: 0,
		currentBalance: 0,
		topPerformers: [],
		createdOn: "",
		updatedOn: "",
		followers: [],
		allocations: [],
	});
	const { matchingCoins } = useMatchingCoins(portfolio.allocations);

	const [isLoading, setIsLoading] = useState(false);

	const getPortfolio = async () => {
		setIsLoading(true);
		try {
			const portfolio = await getPortfolioById(portfolioId);

			portfolio ? setPortfolio(portfolio) : navigate("/404");
		} catch (error) {
			toast.error(error);
			navigate("/404");
		} finally {
			setIsLoading(false);
		}
	};

	const changePortfolio = (value) => setPortfolio(value);

	useEffect(() => {
		getPortfolio();
	}, [portfolioId]);

	return {
		portfolio,
		matchingCoins,
		isLoading,
		changePortfolio,
	};
};

export default useGetPorfolioById;
