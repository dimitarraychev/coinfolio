import { useEffect, useState } from "react";
import Chart from "react-google-charts";
import Loader from "../Loader/Loader";

const LineChart = ({ historicalData }) => {
	const [data, setData] = useState([["Date", "Prices"]]);

	const options = {
		backgroundColor: "transparent",
		legendTextStyle: { color: "#FFF" },
		hAxis: {
			textStyle: { color: "#FFF" },
		},
		lineWidth: 5,
	};

	useEffect(() => {
		let dataCopy = [["Date", "Price"]];
		if (historicalData.prices) {
			historicalData.prices.forEach((item) =>
				dataCopy.push([
					`${new Date(item[0]).toLocaleDateString().slice(0, -5)}`,
					item[1],
				])
			);
			setData(dataCopy);
		}
	}, [historicalData]);

	return (
		<Chart
			chartType="LineChart"
			data={data}
			options={options}
			height="100%"
			legendToggle
			loader={
				<div className="loading">
					<Loader />
				</div>
			}
		/>
	);
};

export default LineChart;
