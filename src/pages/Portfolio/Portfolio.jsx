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
import { calculateAveragePrice } from "../../utils/helpers";
import { saveCursorPosition, restoreCursorPosition } from "../../utils/cursor";

const Portfolio = () => {
	const { allCoins } = useContext(CoinContext);
	const [matchingCoins, setMatchingCoins] = useState([]);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [portfolio, setPortfolio] = useState({
		title: "Low Risk Classic Portfolio",
		owner: "username",
		totalAllocation: 5000,
		alltimeProfitLoss: "$835.47 (16.70%)",
		currentBalance: 5835.47,
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

	portfolio.isPositivePriceChange =
		portfolio.currentBalance >= portfolio.totalAllocation;

	const closeModalHandler = (e) => setIsModalOpen(false);

	const openModalHandler = (e) => setIsModalOpen(true);

	const addCoinHandler = (coin) => {
		setIsModalOpen(false);

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

				return { ...prevPortfolio, allocations: updatedAllocations };
			}

			return {
				...prevPortfolio,
				allocations: [...prevPortfolio.allocations, coin],
			};
		});
	};

	const removeCoinHandler = (coinToRemove) => {
		const updatedAllocations = portfolio.allocations.filter(
			(coin) => coin.id !== coinToRemove.id
		);

		setPortfolio((prevPortfolio) => ({
			...prevPortfolio,
			allocations: updatedAllocations,
		}));
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
				return { ...coin, allocation: matchingAllocation };
			});

		setMatchingCoins(updatedMatchingCoins);
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
					onClick={openModalHandler}
				/>

				<CryptoTable
					className="portfolio-table"
					columns={["#", "Coins", "Price", "Change", "Allocation"]}
				>
					{matchingCoins.map((coin) => (
						<div className="portfolio-row-wrapper" key={coin.id}>
							<CoinTableRow
								coin={coin}
								allocation={coin.allocation}
							/>
							<img
								src={minusIcon}
								alt="remove"
								className="remove-coin-img"
								onClick={() => removeCoinHandler(coin)}
							/>
						</div>
					))}
				</CryptoTable>
			</div>

			{isModalOpen && (
				<AddCoin
					allCoins={allCoins}
					onAddCoin={addCoinHandler}
					onClose={closeModalHandler}
				/>
			)}
		</section>
	);
};

export default Portfolio;
