import React, { useContext } from "react";
import PieChart from "../../components/PieChart";
import { CoinContext } from "../../context/CoinContext";
import CryptoTable from "../../components/CryptoTable/CryptoTable";
import CoinTableRow from "../../components/CoinTableRow";

const mockedPortfolio = {
	title: "Low Risk Classic Portfolio",
	totalAllocation: 5000,
	alltimeProfitLoss: "16.70%",
	currentBalance: 5835,
};

const Portfolio = () => {
	const { allCoins, currency } = useContext(CoinContext);

	return (
		<section className="details">
			<h2 className="details-title">{mockedPortfolio.title}</h2>

			<div className="details-chart">
				<PieChart />
			</div>

			<div className="details-info">
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

			<h3 className="details-title">Assets</h3>

			<CryptoTable
				className="details-assets"
				columns={["#", "Coins", "Price", "24H Change", "Market Cap"]}
			>
				{allCoins.slice(0, 3).map((item, index) => (
					<CoinTableRow item={item} key={index} />
				))}
			</CryptoTable>
		</section>
	);
};

export default Portfolio;
