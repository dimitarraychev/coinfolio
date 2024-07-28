import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import useMatchingCoins from "./useMatchingCoins";
import { useConfirmModalContext } from "../context/ConfirmModalContext";
import {
	addCoinToPortfolio,
	removeCoinFromPortfolio,
} from "../utils/portfolio";
import { postPortfolio } from "../api/firebase-db";

const usePortfolioForm = () => {
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
		allocations: [],
		followers: [],
	});
	const { matchingCoins } = useMatchingCoins(portfolio.allocations);
	const { openConfirmModal } = useConfirmModalContext();
	const [isSubmitButtonDisabled, setIsSubmitButtonDisabled] = useState(true);
	const [isAddCoinOpen, setIsAddCoinOpen] = useState(false);

	const closeAddCoinHandler = (e) => setIsAddCoinOpen(false);
	const openAddCoinHandler = (e) => setIsAddCoinOpen(true);

	const addCoinHandler = (coinToAdd) => {
		setIsAddCoinOpen(false);
		setPortfolio((prevPortfolio) =>
			addCoinToPortfolio(prevPortfolio, coinToAdd)
		);
	};

	const removeCoinHandler = (coinToRemove) => {
		openConfirmModal(
			"Are you sure you want to remove this allocation?",
			() => {
				setPortfolio((prevPortfolio) =>
					removeCoinFromPortfolio(prevPortfolio, coinToRemove)
				);
				toast.success("Success! Allocation successfully removed.");
			}
		);
	};

	const handleTitleChange = (e) =>
		setPortfolio((prevPortfolio) => ({
			...prevPortfolio,
			title: e.target.value,
		}));

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (portfolio.title.length < 3 || portfolio.title.length > 66) {
			toast.error("Error! Title should be between 3 and 66 characters.");
			return;
		}

		if (portfolio.allocations.length < 1) {
			toast.error("Error! Having at least one allocation is required.");
			return;
		}

		try {
			const portfolioId = await postPortfolio(portfolio);
			toast.success(`Success! ${portfolio.title} has been published.`);
			navigate(`/hub/${portfolioId}`);
		} catch (error) {
			toast.error(error);
		}
	};

	useEffect(() => {
		portfolio.title !== "" && portfolio.allocations.length > 0
			? setIsSubmitButtonDisabled(false)
			: setIsSubmitButtonDisabled(true);
	}, [portfolio]);

	return {
		portfolio,
		matchingCoins,
		isSubmitButtonDisabled,
		isAddCoinOpen,
		handleTitleChange,
		closeAddCoinHandler,
		openAddCoinHandler,
		addCoinHandler,
		removeCoinHandler,
		handleSubmit,
	};
};

export default usePortfolioForm;
