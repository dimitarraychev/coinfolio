import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import useMatchingCoins from "./useMatchingCoins";
import { useConfirmModalContext } from "../context/ConfirmModalContext";
import { useAuthContext } from "../context/AuthContext";
import {
	addCoinToPortfolio,
	removeCoinFromPortfolio,
	updatePortfolioMetrics,
} from "../utils/portfolio";
import { saveCursorPosition, restoreCursorPosition } from "../utils/cursor";

const usePortfolioForm = (initialPortfolio, onSubmit, currency) => {
	const navigate = useNavigate();
	const selectionRef = useRef(null);
	const { currentUser, isAuthenticated } = useAuthContext();
	const { openConfirmModal } = useConfirmModalContext();
	const [portfolio, setPortfolio] = useState(initialPortfolio);
	const { matchingCoins } = useMatchingCoins(portfolio.allocations);
	const [isSubmitButtonDisabled, setIsSubmitButtonDisabled] = useState(true);
	const [isAddCoinOpen, setIsAddCoinOpen] = useState(false);
	const [isEditMode, setIsEditMode] = useState(false);

	const toggleEditModeHandler = () => setIsEditMode(true);
	const closeAddCoinHandler = () => setIsAddCoinOpen(false);
	const openAddCoinHandler = () => setIsAddCoinOpen(true);

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

	const titleChangeHandler = (e) => {
		isEditMode && saveCursorPosition(selectionRef);

		setPortfolio((prevPortfolio) => ({
			...prevPortfolio,
			title: isEditMode ? e.target.textContent : e.target.value,
		}));

		isEditMode && restoreCursorPosition(selectionRef);
	};

	const setFollowers = (followers, followersCount) => {
		setPortfolio((prevPortfolio) => ({
			...prevPortfolio,
			followers,
			followersCount,
		}));
	};

	const submitHandler = async (e) => {
		e.preventDefault();
		setIsSubmitButtonDisabled(true);

		if (portfolio.title.length < 3 || portfolio.title.length > 66) {
			toast.error("Error! Title should be between 3 and 66 characters.");
			return;
		}

		if (portfolio.allocations.length < 1) {
			toast.error("Error! Having at least one allocation is required.");
			return;
		}

		const decoratedPortfolio = { ...portfolio };
		if (!isEditMode)
			decoratedPortfolio.owner = {
				uid: currentUser.uid,
				displayName: currentUser.displayName,
			};

		try {
			const portfolioId = await onSubmit(decoratedPortfolio);

			portfolioId
				? toast.success(
						`Success! ${portfolio.title} has been published.`
				  )
				: toast.success(`Success! ${portfolio.title} has been edited.`);
			portfolioId && navigate(`/hub/${portfolioId}`);
		} catch (error) {
			toast.error(error.message);
		} finally {
			setIsSubmitButtonDisabled(false);
			setIsEditMode(false);
		}
	};

	useEffect(() => {
		if (isEditMode) restoreCursorPosition(selectionRef);

		portfolio.title !== "" && portfolio.allocations.length > 0
			? setIsSubmitButtonDisabled(false)
			: setIsSubmitButtonDisabled(true);
	}, [portfolio]);

	useEffect(() => {
		setPortfolio((prevPortfolio) =>
			updatePortfolioMetrics(prevPortfolio, matchingCoins, currency)
		);
	}, [matchingCoins, currency]);

	useEffect(() => {
		setPortfolio(initialPortfolio);
	}, [initialPortfolio]);

	return {
		portfolio,
		matchingCoins,
		isSubmitButtonDisabled,
		isAddCoinOpen,
		isEditMode,
		toggleEditModeHandler,
		titleChangeHandler,
		closeAddCoinHandler,
		openAddCoinHandler,
		addCoinHandler,
		removeCoinHandler,
		submitHandler,
		setFollowers,
	};
};

export default usePortfolioForm;
