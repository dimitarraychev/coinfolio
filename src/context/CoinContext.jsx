import { createContext, useState, useEffect } from "react";
import { fetchAllCoins, fetchGlobalMarketData } from "../api/coinGecko";
import { getUsdToEurRate } from "../api/freecurrencyapi";
import { formatNumber } from "../utils/helpers";

export const CoinContext = createContext();

const CoinContextProvider = ({ children }) => {
	const [allCoins, setAllCoins] = useState([]);
	const [globalMarketData, setGlobalMarketData] = useState({});
	const [usdToEurRate, setUsdToEurRate] = useState([]);
	const [currency, setCurrency] = useState({ name: "usd", symbol: "$" });

	const loadAllCoins = async () => {
		try {
			const coins = await fetchAllCoins(currency.name);
			setAllCoins(coins);
		} catch (err) {
			console.error(err);
		}
	};

	const loadGlobalMarketData = async () => {
		try {
			const marketData = await fetchGlobalMarketData();
			setGlobalMarketData(marketData);
		} catch (err) {
			console.error(err);
		}
	};

	const loadUsdToEurRate = async () => {
		try {
			const rate = await getUsdToEurRate();
			setUsdToEurRate(rate);
		} catch (err) {
			console.error(err);
		}
	};

	useEffect(() => {
		loadGlobalMarketData();
		loadUsdToEurRate();
	}, []);

	useEffect(() => {
		loadAllCoins();
	}, [currency]);

	const convertUsdToEur = (priceInUsd) =>
		formatNumber(priceInUsd * usdToEurRate);

	const convertEurToUsd = (priceInEur) =>
		formatNumber(priceInEur * (1 / usdToEurRate));

	const contextValue = {
		allCoins,
		currency,
		setCurrency,
		globalMarketData,
		convertUsdToEur,
		convertEurToUsd,
	};

	return (
		<CoinContext.Provider value={contextValue}>
			{children}
		</CoinContext.Provider>
	);
};

export default CoinContextProvider;
