import React, { useState, useEffect } from "react";
import { Chart } from "react-google-charts";

const PieChart = ({ data }) => {
	const [chartData, setChartData] = useState([
		["Crypto", "Allocation"],
		["none", 1],
	]);

	useEffect(() => {
		let dataCopy = [["Crypto", "Allocation"]];
		if (data.length > 0) {
			data.map((coin) => dataCopy.push([coin.name, coin.total]));
			setChartData(dataCopy);
		}
	}, [data]);

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
