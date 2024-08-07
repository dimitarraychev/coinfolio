import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { fetchGlobalMarketData } from "./coingecko";

const useGetGlobalMarketData = () => {
	const [globalMarketData, setGlobalMarketData] = useState({});
	const [isLoading, setIsLoading] = useState(true);

	const isPositiveCapChange =
		globalMarketData.data?.market_cap_change_percentage_24h_usd > 0;

	const loadGlobalMarketData = async (signal) => {
		try {
			const marketData = await fetchGlobalMarketData(signal);

			setGlobalMarketData(marketData.data);
		} catch (error) {
			toast.error(error.mesage);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		const controller = new AbortController();
		loadGlobalMarketData(controller.signal);

		return () => controller.abort();
	}, []);

	return {
		globalMarketData,
		isPositiveCapChange,
		isLoading,
	};
};

export default useGetGlobalMarketData;
