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
		chartArea: {
			left: "3%",
			top: "3%",
			height: "94%",
			width: "94%",
		},
		legend: {
			position: "labeled",
		},
	};

	return (
		<Chart
			chartType="PieChart"
			data={data}
			options={options}
			height="100%"
			width="100%"
		/>
	);
};

export default PieChart;
