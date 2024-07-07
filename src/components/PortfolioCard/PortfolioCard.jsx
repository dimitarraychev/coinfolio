import React from "react";
import "./PortfolioCard.css";
import { Chart } from "react-google-charts";
import Button from "../Button/Button";
import { Link } from "react-router-dom";

const data = [
	["Crypto", "Allocation"],
	["ETH", 2000],
	["SOL", 1000],
	["ADA", 500],
	["CRO", 300],
	["DOGE", 200],
];

const options = {
	backgroundColor: "transparent",
	legendTextStyle: { color: "#FFF" },
	hAxis: {
		textStyle: { color: "#FFF" },
	},
	is3D: true,
	// legend: { position: "none" },
	height: 200,
	width: 400,
};

const PortfolioCard = () => {
	return (
		<Link className="portfolio-card" to={"/portfolio/1"}>
			{/* <Chart
				chartType="PieChart"
				data={data}
				options={options}
				width={"300px"}
			/> */}

			<h5>Low Risk Classic Porfolio</h5>
		</Link>
	);
};

export default PortfolioCard;
