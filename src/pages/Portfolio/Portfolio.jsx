import React, { useContext } from "react";
import PieChart from "../../components/PieChart/PieChart";
import { CoinContext } from "../../context/CoinContext";
import CryptoTable from "../../components/CryptoTable/CryptoTable";
import CoinTableRow from "../../components/CoinTableRow/CoinTableRow";

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
			<div className="details-title">
				<h2>{mockedPortfolio.title}</h2>
			</div>
			<div className="details-chart">
				<PieChart />
			</div>
			<div className="details-info">
				<ul>
					<li>Current Balance</li>
					<li>
						{currency.symbol}
						{mockedPortfolio.currentBalance}
					</li>
				</ul>
				<ul>
					<li>Alltime Profit/Loss</li>
					<li>{mockedPortfolio.alltimeProfitLoss}</li>
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
			<div className="details-assets">
				<CryptoTable
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
