import React, { useContext } from "react";
import PieChart from "../../components/PieChart";
import { CoinContext } from "../../context/CoinContext";
import CryptoTable from "../../components/CryptoTable/CryptoTable";
import CoinTableRow from "../../components/CoinTableRow";
import "./Portfolio.css";
import Button from "../../components/Button/Button";

const mockedPortfolio = {
	title: "Low Risk Classic Portfolio",
	owner: "username",
	totalAllocation: 5000,
	alltimeProfitLoss: "$835.47 (16.70%)",
	currentBalance: 5835.47,
};

const Portfolio = () => {
	const { allCoins, currency } = useContext(CoinContext);

	return (
		<section className="portfolio-details">
			<div className="details-left">
				<div className="title-wrapper">
					<h2>{mockedPortfolio.title}</h2>
					<p className="owner">@{mockedPortfolio.owner}</p>
					<div className="user-btn-wrapper">
						<Button text={"edit"} />
						<Button text={"delete"} />
					</div>
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
					<h3 className="green" id="current-balance">
						{currency.symbol}
						{mockedPortfolio.currentBalance}
					</h3>
				</div>

				<div className="info">
					<ul>
						<li>Alltime Profit/Loss</li>
						<li className="green">
							{mockedPortfolio.alltimeProfitLoss}
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
					<PieChart />
				</div>

				<h3 className="assets-title">Assets</h3>

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
					{allCoins.slice(0, 3).map((item, index) => (
						<CoinTableRow item={item} key={index} />
					))}
				</CryptoTable>
			</div>
		</section>
	);
};

export default Portfolio;
