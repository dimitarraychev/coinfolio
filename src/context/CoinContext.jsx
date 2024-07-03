import { createContext, useState, useEffect } from "react";
import { fetchAllCoins, fetchGlobalMarketData } from "../api/coinGecko";

export const CoinContext = createContext();

const CoinContextProvider = (props) => {
	const [allCoins, setAllCoins] = useState([]);
	const [globalMarketData, setGlobalMarketData] = useState([]);
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

	useEffect(() => {
		loadGlobalMarketData();
	}, []);

	useEffect(() => {
		loadAllCoins();
	}, [currency]);

	const contextValue = {
		allCoins,
		currency,
		setCurrency,
		globalMarketData,
	};

	return (
		<CoinContext.Provider value={contextValue}>
			{props.children}
		</CoinContext.Provider>
	);
};

export default CoinContextProvider;
