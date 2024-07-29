import { useState, useEffect } from "react";
import Chart from "react-google-charts";
import Loader from "../Loader/Loader";

const PieChart = ({ allocations, currency }) => {
	const [chartData, setChartData] = useState([
		["Crypto", "Allocation"],
		["none", 1],
	]);

	useEffect(() => {
		if (!allocations) {
			setChartData([
				["Crypto", "Allocation"],
				["none", 1],
			]);
			return;
		}

		let allocationsCopy = [["Crypto", "Allocation"]];

		allocations.forEach((coin) => {
			allocationsCopy.push([coin.name, coin.total[currency.name]]);
		});

		setChartData(allocationsCopy);
	}, [allocations, currency]);

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
			loader={
				<div className="loading">
					<Loader />
				</div>
			}
		/>
	);
};

export default PieChart;
