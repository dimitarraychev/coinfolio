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
import PortfolioDetails from "./PortfolioDetails/PortfolioDetails";
import { saveCursorPosition, restoreCursorPosition } from "../../utils/cursor";
import {
	addCoinToPortfolio,
	removeCoinFromPortfolio,
	updatePortfolioMetrics,
} from "../../utils/portfolio";
import useMatchingCoins from "../../hooks/useMatchingCoins";
import { useNavigate, useParams } from "react-router-dom";
import { getPortfolio } from "../../api/firebase-db";
import Loader from "../../components/Loader/Loader";

const Portfolio = () => {
	const { allCoins, currency } = useCoinContext();
	const { openConfirmModal } = useConfirmModalContext();
	const { portfolioId } = useParams();
	const navigate = useNavigate();

	const [portfolio, setPortfolio] = useState({
		title: "Low Risk Classic Portfolio",
		owner: {
			uid: "123",
			displayName: "username",
		},
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
		followers: [],
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
		],
	});
	const { matchingCoins } = useMatchingCoins(portfolio.allocations);

	const [isEditMode, setIsEditMode] = useState(false);
	const [isAddCoinOpen, setIsAddCoinOpen] = useState(false);
	const [isLoading, setIsLoading] = useState(true);

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

		if (portfolio.allocations.length < 1) {
			toast.error("Error! Having at least one allocation is required.");
			return;
		}

		toast.success(`Success! ${portfolio.title} has been saved.`);
		setIsEditMode(false);
	};

	const getPortfolioData = async () => {
		setIsLoading(true);
		try {
			const portfolio = await getPortfolio(portfolioId);

			portfolio ? setPortfolio(portfolio) : navigate("/404");
		} catch (error) {
			toast.error(error);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => restoreCursorPosition(selectionRef), [portfolio.title]);

	useEffect(() => {
		setPortfolio((prevPortfolio) =>
			updatePortfolioMetrics(prevPortfolio, matchingCoins, currency)
		);
	}, [matchingCoins, currency]);

	useEffect(() => {
		getPortfolioData();
	}, [portfolioId]);

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
					allCoins={allCoins}
					onAddCoin={addCoinHandler}
					onClose={closeAddCoinHandler}
				/>
			)}
		</section>
	);
};

export default Portfolio;
