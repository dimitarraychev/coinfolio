import { useEffect, useState } from "react";
import { fetchCoinData, fetchHistoricalData } from "./coingecko";
import { toast } from "react-toastify";

const useGetCoinById = (coinId, currency) => {
	const [coin, setCoin] = useState({});
	const [historicalData, setHistoricalData] = useState({});
	const [isLoading, setIsLoading] = useState(true);

	const getCoinById = async () => {
		try {
			const coinData = await fetchCoinData(coinId);

			const historicalData = await fetchHistoricalData(
				coinId,
				currency.name
			);

			setCoin(coinData);
			setHistoricalData(historicalData);
		} catch (error) {
			toast.error(error.message);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		getCoinById();
	}, [coinId, currency]);

	return {
		coin,
		historicalData,
		isLoading,
	};
};

export default useGetCoinById;
