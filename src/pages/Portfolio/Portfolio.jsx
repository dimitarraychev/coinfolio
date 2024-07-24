import React, { useContext, useState, useRef, useEffect } from "react";
import { toast } from "react-toastify";

import "./Portfolio.css";
import minusIcon from "../../assets/icons/minus-icon.svg";

import { CoinContext } from "../../context/CoinContext";
import { useConfirmModalContext } from "../../context/ConfirmModalContext";
import PieChart from "../../components/PieChart/PieChart";
import CryptoTable from "../../components/CryptoTable/CryptoTable";
import CoinTableRow from "../../components/CoinTableRow/CoinTableRow";
import Button from "../../components/Button/Button";
import AddCoin from "../../components/AddCoin/AddCoin";
import PortfolioDetails from "./PortfolioDetails/PortfolioDetails";
import { saveCursorPosition, restoreCursorPosition } from "../../utils/cursor";
import {
	addCoinToPortfolio,
	removeCoinFromPortfolio,
	updatePortfolioMetrics,
} from "../../utils/portfolio";
import useMatchingCoins from "../../hooks/useMatchingCoins";

const Portfolio = () => {
	const { allCoins, currency } = useContext(CoinContext);
	const { openConfirmModal } = useConfirmModalContext();

	const [portfolio, setPortfolio] = useState({
		title: "Low Risk Classic Portfolio",
		owner: "username",
		totalAllocation: {
			usd: 9262.28,
			eur: 8538.85,
		},
		alltimeProfitLoss: 0,
		alltimeProfitLossPercentage: 0,
		currentBalance: 0,
		topPerformers: [],
		createdOn: "1717699200",
		updatedOn: "1717699200",
		followers: 1389,
		allocations: [
			{
				name: "Ethereum",
				id: "ethereum",
				total: {
					usd: 3462.28,
					eur: 3189.61,
				},
				price: {
					usd: 3462.28,
					eur: 3189.61,
				},
				quantity: 1,
			},
			{
				name: "Bitcoin",
				id: "bitcoin",
				total: {
					usd: 5000,
					eur: 4614.4,
				},
				price: {
					usd: 10000,
					eur: 9228.7,
				},
				quantity: 0.5,
			},
			{
				name: "Cronos",
				total: {
					usd: 400,
					eur: 370,
				},
				id: "crypto-com-chain",
				price: {
					usd: 0.4,
					eur: 0.37,
				},
				quantity: 1000,
			},
			{
				name: "Cardano",
				total: {
					usd: 400,
					eur: 370,
				},
				id: "cardano",
				price: {
					usd: 2,
					eur: 1.85,
				},
				quantity: 100,
			},
		],
	});
	const { matchingCoins } = useMatchingCoins(portfolio.allocations);

	const [isEditMode, setIsEditMode] = useState(false);
	const [isAddCoinOpen, setIsAddCoinOpen] = useState(false);

	const selectionRef = useRef(null);

	const closeAddCoinHandler = (e) => setIsAddCoinOpen(false);
	const openAddCoinHandler = (e) => setIsAddCoinOpen(true);

	const toggleEditModeHandler = () => setIsEditMode(true);

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
		saveCursorPosition(selectionRef);

		setPortfolio((prevPortfolio) => ({
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

		if (portfolio.allocations < 1) {
			toast.error("Error! Having at least one allocation is required.");
			return;
		}

		toast.success(`Success! ${portfolio.title} has been saved.`);
		setIsEditMode(false);
	};

	useEffect(() => restoreCursorPosition(selectionRef), [portfolio.title]);

	useEffect(() => {
		setPortfolio((prevPortfolio) =>
			updatePortfolioMetrics(prevPortfolio, matchingCoins, currency)
		);
	}, [matchingCoins, currency]);

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
					allCoins={allCoins}
					onAddCoin={addCoinHandler}
					onClose={closeAddCoinHandler}
				/>
			)}
		</section>
	);
};

export default Portfolio;
