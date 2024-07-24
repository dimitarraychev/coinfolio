import React, { useState, useEffect } from "react";
import { Chart } from "react-google-charts";

const PieChart = ({ data, currency }) => {
	const [chartData, setChartData] = useState([
		["Crypto", "Allocation"],
		["none", 1],
	]);

	useEffect(() => {
		if (data.length < 1) {
			setChartData([
				["Crypto", "Allocation"],
				["none", 1],
			]);
			return;
		}

		let dataCopy = [["Crypto", "Allocation"]];

		data.map((coin) => {
			const total =
				currency.name === "usd" ? coin.total.usd : coin.total.eur;
			dataCopy.push([coin.name, total]);
		});
		setChartData(dataCopy);
	}, [data, currency]);

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
			data={chartData}
			options={options}
			height="100%"
			width="100%"
		/>
	);
};

export default PieChart;
