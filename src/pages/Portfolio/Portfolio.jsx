import React, { useState, useRef, useEffect } from "react";
import { toast } from "react-toastify";

import "./Portfolio.css";
import minusIcon from "../../assets/icons/minus-icon.svg";

import { useCoinContext } from "../../context/CoinContext";
import { useConfirmModalContext } from "../../context/ConfirmModalContext";
import PieChart from "../../components/PieChart/PieChart";
import CryptoTable from "../../components/CryptoTable/CryptoTable";
import CoinTableRow from "../../components/CoinTableRow/CoinTableRow";
import Button from "../../components/Button/Button";
import AddCoin from "../../components/AddCoin/AddCoin";
import Loader from "../../components/Loader/Loader";
import PortfolioDetails from "./PortfolioDetails/PortfolioDetails";
import { saveCursorPosition, restoreCursorPosition } from "../../utils/cursor";
import {
	addCoinToPortfolio,
	removeCoinFromPortfolio,
	updatePortfolioMetrics,
} from "../../utils/portfolio";
import useGetPorfolioById from "../../hooks/useGetPortfolioById";

const Portfolio = () => {
	const { currency } = useCoinContext();
	const { openConfirmModal } = useConfirmModalContext();
	const { portfolio, matchingCoins, isLoading, changePortfolio } =
		useGetPorfolioById();

	const [isEditMode, setIsEditMode] = useState(false);
	const [isAddCoinOpen, setIsAddCoinOpen] = useState(false);

	const selectionRef = useRef(null);

	const closeAddCoinHandler = (e) => setIsAddCoinOpen(false);
	const openAddCoinHandler = (e) => setIsAddCoinOpen(true);

	const toggleEditModeHandler = () => setIsEditMode(true);

	const addCoinHandler = (coinToAdd) => {
		setIsAddCoinOpen(false);
		changePortfolio((prevPortfolio) =>
			addCoinToPortfolio(prevPortfolio, coinToAdd)
		);
	};

	const removeCoinHandler = (coinToRemove) => {
		openConfirmModal(
			"Are you sure you want to remove this allocation?",
			() => {
				changePortfolio((prevPortfolio) =>
					removeCoinFromPortfolio(prevPortfolio, coinToRemove)
				);
				toast.success("Success! Allocation successfully removed.");
			}
		);
	};

	const titleChangeHandler = (e) => {
		saveCursorPosition(selectionRef);

		changePortfolio((prevPortfolio) => ({
			...prevPortfolio,
			title: e.target.textContent,
		}));

		restoreCursorPosition(selectionRef);
	};

	const saveChangesHandler = () => {
		if (portfolio.title.length < 3 || portfolio.title.length > 66) {
			toast.error("Error! Title should be between 3 and 66 characters.");
			return;
		}

		if (portfolio.allocations.length < 1) {
			toast.error("Error! Having at least one allocation is required.");
			return;
		}

		toast.success(`Success! ${portfolio.title} has been saved.`);
		setIsEditMode(false);
	};

	useEffect(() => restoreCursorPosition(selectionRef), [portfolio.title]);

	useEffect(() => {
		changePortfolio((prevPortfolio) =>
			updatePortfolioMetrics(prevPortfolio, matchingCoins, currency)
		);
	}, [matchingCoins, currency]);

	if (isLoading)
		return (
			<section className="portfolio">
				<div className="loading">
					<Loader size="10rem" />
				</div>
			</section>
		);

	return (
		<section className="portfolio">
			<PortfolioDetails
				isEditMode={isEditMode}
				portfolio={portfolio}
				onTitleChange={titleChangeHandler}
				onEditModeToggle={toggleEditModeHandler}
				onSave={saveChangesHandler}
			/>

			<div className="portfolio-assets">
				<div className="portfolio-chart">
					<PieChart
						data={portfolio.allocations}
						currency={currency}
					/>
				</div>

				<h3 className="assets-title">Allocations</h3>

				{isEditMode && (
					<Button
						text={"add coin"}
						isGhost={true}
						onClick={openAddCoinHandler}
					/>
				)}

				<CryptoTable
					className="portfolio-table"
					columns={[
						"#",
						"Coins",
						"Price",
						"Profit/Loss",
						"Allocation",
					]}
				>
					{matchingCoins.map((coin) =>
						isEditMode ? (
							<div
								className="portfolio-row-wrapper"
								key={coin.id}
							>
								<CoinTableRow
									coin={coin.market_data}
									allocation={coin}
								/>
								<img
									src={minusIcon}
									alt="remove"
									className="remove-coin-img"
									onClick={() => removeCoinHandler(coin)}
								/>
							</div>
						) : (
							<CoinTableRow
								coin={coin.market_data}
								allocation={coin}
								key={coin.id}
							/>
						)
					)}
				</CryptoTable>
			</div>

			{isAddCoinOpen && (
				<AddCoin
					onAddCoin={addCoinHandler}
					onClose={closeAddCoinHandler}
				/>
			)}
		</section>
	);
};

export default Portfolio;
