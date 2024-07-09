import React, { useContext, useState } from "react";
import "./Portfolio.css";
import minusIcon from "../../assets/icons/minus-icon.svg";
import editIcon from "../../assets/icons/edit-icon.svg";
import arrowUp from "../../assets/icons/arrow-up.svg";
import arrowDown from "../../assets/icons/arrow-down.svg";

import { CoinContext } from "../../context/CoinContext";
import PieChart from "../../components/PieChart";
import CryptoTable from "../../components/CryptoTable/CryptoTable";
import CoinTableRow from "../../components/CoinTableRow";
import Button from "../../components/Button/Button";
import AddCoin from "../../components/AddCoin/AddCoin";

const mockedPortfolio = {
	title: "Low Risk Classic Portfolio",
	owner: "username",
	totalAllocation: 5000,
	alltimeProfitLoss: "$835.47 (16.70%)",
	currentBalance: 5835.47,
	allocations: [
		{ name: "Ethereum", total: 3000 },
		{ name: "Bitcoin", total: 1000 },
		{ name: "Cronos", total: 800 },
		{ name: "Cardano", total: 200 },
	],
};

const Portfolio = () => {
	const { allCoins, currency } = useContext(CoinContext);
	const [isModalOpen, setIsModalOpen] = useState(false);

	const isPositivePriceChange =
		mockedPortfolio.currentBalance >= mockedPortfolio.totalAllocation;

	const closeModalHandler = (e) => {
		setIsModalOpen(false);
	};

	const openModalHandler = (e) => {
		setIsModalOpen(true);
	};

	const addCoinHandler = (coin) => {
		setIsModalOpen(false);
		console.log(coin);

		// const existingCoin = inputCoins.find((c) => c.id === coin.id);

		// if (existingCoin) {
		// 	const updatedCoins = inputCoins.map((c) => {
		// 		if (c.id !== coin.id) return c;

		// 		return {
		// 			...c,
		// 			quantity: c.quantity + coin.quantity,
		// 			total: c.total + coin.total,
		// 			price: calculateAveragePrice(
		// 				c.price,
		// 				c.quantity,
		// 				coin.price,
		// 				coin.quantity
		// 			),
		// 		};
		// 	});
		// 	return setInputCoins(updatedCoins);
		// }

		// setInputCoins((prevCoins) => [...prevCoins, coin]);
	};

	const removeCoinHandler = (coinToRemove) => {
		console.log(coinToRemove);
		// const updatedInputCoins = inputCoins.filter(
		// 	(coin) => coin.id !== coinToRemove.id
		// );

		// setInputCoins(updatedInputCoins);
	};

	return (
		<section className="portfolio-details">
			<div className="details-left">
				<div className="title-wrapper">
					<h2>
						{mockedPortfolio.title}{" "}
						<img src={editIcon} alt="edit" className="edit-img" />
					</h2>
					<p className="owner">@{mockedPortfolio.owner}</p>
					<Button text={"delete"} />
				</div>

				<div className="followers-wrapper">
					<label htmlFor="portfolio-followers">Followers</label>
					<div className="follower-bottom">
						<h5>312</h5>
						<Button text={"follow"} />
					</div>
				</div>

				<div className="current-balance-wrapper">
					<label className="balance-label" htmlFor="current-balance">
						Current Balance
					</label>
					<h3
						className={isPositivePriceChange ? "green" : "red"}
						id="current-balance"
					>
						{currency.symbol}
						{mockedPortfolio.currentBalance}
						<img
							src={isPositivePriceChange ? arrowUp : arrowDown}
							alt="arrow"
							className="arrow"
						/>
					</h3>
				</div>

				<div className="info">
					<ul>
						<li>Alltime Profit/Loss</li>
						<li className={isPositivePriceChange ? "green" : "red"}>
							{mockedPortfolio.alltimeProfitLoss}
							<img
								src={
									isPositivePriceChange ? arrowUp : arrowDown
								}
								alt="arrow"
								className="arrow"
							/>
						</li>
					</ul>
					<ul>
						<li>Top Performers</li>
						<li>ETH, CRO, ADA</li>
					</ul>
					<ul>
						<li>Total Allocation</li>
						<li>
							{currency.symbol}
							{mockedPortfolio.totalAllocation}
						</li>
					</ul>
					<ul>
						<li>Created On</li>
						<li>07 July 2024</li>
					</ul>
					<ul>
						<li>Edited On</li>
						<li>08 July 2024</li>
					</ul>
				</div>
			</div>

			<div className="details-right">
				<div className="portfolio-chart">
					<PieChart data={mockedPortfolio.allocations} />
				</div>

				<h3 className="assets-title">Assets</h3>

				<Button
					text={"add coin"}
					isGhost={true}
					onClick={openModalHandler}
				/>

				<CryptoTable
					className="portfolio-assets"
					columns={[
						"#",
						"Coins",
						"Price",
						"24H Change",
						"Market Cap",
					]}
				>
					{allCoins.slice(0, 3).map((coin) => (
						<div className="portfolio-row-wrapper" key={coin.id}>
							<CoinTableRow coin={coin} />
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
