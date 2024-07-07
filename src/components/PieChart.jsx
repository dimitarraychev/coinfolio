import React from "react";
import { Chart } from "react-google-charts";

const data = [
	["Crypto", "Allocation"],
	["ETH", 2000],
	["SOL", 1000],
	["ADA", 500],
	["CRO", 300],
	["DOGE", 200],
];

const PieChart = () => {
	const options = {
		backgroundColor: "transparent",
		legendTextStyle: { color: "#FFF" },
		hAxis: {
			textStyle: { color: "#FFF" },
		},
		is3D: true,
	};

	return (
		<Chart
			chartType="PieChart"
			data={data}
			options={options}
			height="100%"
		/>
	);
};

export default PieChart;
