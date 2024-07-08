import React, { useContext } from "react";
import PieChart from "../../components/PieChart";
import { CoinContext } from "../../context/CoinContext";
import CryptoTable from "../../components/CryptoTable/CryptoTable";
import CoinTableRow from "../../components/CoinTableRow";
import "./Portfolio.css";

const mockedPortfolio = {
	title: "Low Risk Classic Portfolio",
	owner: "username",
	totalAllocation: 5000,
	alltimeProfitLoss: "16.70%",
	currentBalance: 5835,
};

const Portfolio = () => {
	const { allCoins, currency } = useContext(CoinContext);

	return (
		<section className="portfolio-details">
			<div className="portfolio-details-left">
				<div className="portfolio-details-title">
					<h2>{mockedPortfolio.title}</h2>
					<p className="portfolio-owner">@{mockedPortfolio.owner}</p>
				</div>

				<div className="portfolio-details-info">
					<ul>
						<li>Current Balance</li>
						<li className="green">
							{currency.symbol}
							{mockedPortfolio.currentBalance}
						</li>
					</ul>
					<ul>
						<li>Alltime Profit/Loss</li>
						<li className="green">
							{mockedPortfolio.alltimeProfitLoss}
						</li>
					</ul>
					<ul>
						<li>Total Allocation</li>
						<li>
							{currency.symbol}
							{mockedPortfolio.totalAllocation}
						</li>
					</ul>
					<ul>
						<li>Top Performers</li>
						<li>ETH, CRO, ADA</li>
					</ul>
				</div>
			</div>

			<div className="portfolio-details-right">
				<div className="portfolio-details-chart">
					<PieChart />
				</div>

				<h3 className="assets-title">Assets</h3>

				<CryptoTable
					className="portfolio-details-assets"
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
