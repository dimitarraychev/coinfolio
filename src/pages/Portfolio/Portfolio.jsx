import React, { useContext, useState, useRef, useEffect } from "react";
import "./Portfolio.css";
import minusIcon from "../../assets/icons/minus-icon.svg";

import { CoinContext } from "../../context/CoinContext";
import PieChart from "../../components/PieChart/PieChart";
import CryptoTable from "../../components/CryptoTable/CryptoTable";
import CoinTableRow from "../../components/CoinTableRow/CoinTableRow";
import Button from "../../components/Button/Button";
import AddCoin from "../../components/AddCoin/AddCoin";
import PortfolioDetails from "./PortfolioDetails/PortfolioDetails";
import ConfirmModal from "../../components/ConfirmModal/ConfirmModal";
import {
	calculateAveragePrice,
	calculateCoinProfitLoss,
	calculateCurrentBalance,
	calculatePriceChangePercentage,
	findTopPerformers,
} from "../../utils/helpers";
import { saveCursorPosition, restoreCursorPosition } from "../../utils/cursor";

const Portfolio = () => {
	const { allCoins } = useContext(CoinContext);
	const [matchingCoins, setMatchingCoins] = useState([]);
	const [coinToRemove, setCoinToRemove] = useState({});
	const [isAddCoinOpen, setIsAddCoinOpen] = useState(false);
	const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
	const [portfolio, setPortfolio] = useState({
		title: "Low Risk Classic Portfolio",
		owner: "username",
		totalAllocation: 5000,
		alltimeProfitLoss: 0,
		currentBalance: 0,
		topPerformers: [],
		createdOn: "1717699200",
		updatedOn: "1717699200",
		followers: 1389,
		allocations: [
			{
				name: "Ethereum",
				total: 3000,
				id: "ethereum",
				price: 3000,
				quantity: 1,
			},
			{
				name: "Bitcoin",
				total: 1000,
				id: "bitcoin",
				price: 10000,
				quantity: 0.1,
			},
			{
				name: "Cronos",
				total: 800,
				id: "crypto-com-chain",
				price: 0.8,
				quantity: 1000,
			},
			{
				name: "Cardano",
				total: 200,
				id: "cardano",
				price: 2,
				quantity: 100,
			},
		],
	});

	const selectionRef = useRef(null);

	const closeAddCoinHandler = (e) => setIsAddCoinOpen(false);

	const openAddCoinHandler = (e) => setIsAddCoinOpen(true);

	const closeConfirmModalHandler = (e) => setIsConfirmModalOpen(false);

	const openConfirmModalHandler = (coin) => {
		setCoinToRemove(coin);
		setIsConfirmModalOpen(true);
	};

	const addCoinHandler = (coin) => {
		setIsAddCoinOpen(false);

		setPortfolio((prevPortfolio) => {
			const existingCoin = prevPortfolio.allocations.find(
				(c) => c.id === coin.id
			);

			if (existingCoin) {
				const updatedAllocations = prevPortfolio.allocations.map(
					(c) => {
						if (c.id !== coin.id) return c;

						return {
							...c,
							quantity: c.quantity + coin.quantity,
							total: c.total + coin.total,
							price: calculateAveragePrice(
								c.price,
								c.quantity,
								coin.price,
								coin.quantity
							),
						};
					}
				);

				return {
					...prevPortfolio,
					allocations: updatedAllocations,
					totalAllocation: portfolio.totalAllocation + coin.total,
				};
			}

			return {
				...prevPortfolio,
				allocations: [...prevPortfolio.allocations, coin],
				totalAllocation: portfolio.totalAllocation + coin.total,
			};
		});
	};

	const removeCoinHandler = () => {
		setIsConfirmModalOpen(false);

		const updatedAllocations = portfolio.allocations.filter(
			(coin) => coin.id !== coinToRemove.id
		);

		setPortfolio((prevPortfolio) => ({
			...prevPortfolio,
			allocations: updatedAllocations,
			totalAllocation: portfolio.totalAllocation - coinToRemove.total,
		}));
		setCoinToRemove({});
	};

	const titleChangeHandler = (e) => {
		saveCursorPosition(selectionRef);

		setPortfolio((prevPortfolio) => ({
			...prevPortfolio,
			title: e.target.textContent,
		}));

		restoreCursorPosition(selectionRef);
	};

	useEffect(() => restoreCursorPosition(selectionRef), [portfolio.title]);

	useEffect(() => {
		const updatedMatchingCoins = allCoins
			.filter((coin) =>
				portfolio.allocations.some(
					(allocation) => allocation.id === coin.id
				)
			)
			.map((coin) => {
				const matchingAllocation = portfolio.allocations.find(
					(allocation) => allocation.id === coin.id
				);
				return {
					...matchingAllocation,
					market_data: {
						...coin,
						price_change_alltime: calculatePriceChangePercentage(
							matchingAllocation.price,
							coin.current_price
						),
						alltime_profit_loss: calculateCoinProfitLoss(
							matchingAllocation.quantity,
							matchingAllocation.price,
							coin.current_price
						),
					},
				};
			});

		setMatchingCoins(updatedMatchingCoins);

		const currentBalance = calculateCurrentBalance(updatedMatchingCoins);
		setPortfolio((prevPortfolio) => ({
			...prevPortfolio,
			currentBalance,
			isPositivePriceChange: currentBalance >= portfolio.totalAllocation,
			alltimeProfitLoss: (
				currentBalance - portfolio.totalAllocation
			).toFixed(2),
			alltimeProfitLossPercentage: calculatePriceChangePercentage(
				portfolio.totalAllocation,
				currentBalance
			),
			topPerformers: findTopPerformers(updatedMatchingCoins),
		}));
	}, [allCoins, portfolio.allocations]);

	return (
		<section className="portfolio">
			<PortfolioDetails
				portfolio={portfolio}
				onTitleChange={titleChangeHandler}
			/>

			<div className="portfolio-assets">
				<div className="portfolio-chart">
					<PieChart data={portfolio.allocations} />
				</div>

				<h3 className="assets-title">Assets</h3>

				<Button
					text={"add coin"}
					isGhost={true}
					onClick={openAddCoinHandler}
				/>

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
					{matchingCoins.map((coin) => (
						<div className="portfolio-row-wrapper" key={coin.id}>
							<CoinTableRow
								coin={coin.market_data}
								allocation={coin}
							/>
							<img
								src={minusIcon}
								alt="remove"
								className="remove-coin-img"
								onClick={() => openConfirmModalHandler(coin)}
							/>
						</div>
					))}
				</CryptoTable>
			</div>

			{isAddCoinOpen && (
				<AddCoin
					allCoins={allCoins}
					onAddCoin={addCoinHandler}
					onClose={closeAddCoinHandler}
				/>
			)}

			{isConfirmModalOpen && (
				<ConfirmModal
					onClose={closeConfirmModalHandler}
					onConfirm={removeCoinHandler}
				/>
			)}
		</section>
	);
};

export default Portfolio;
