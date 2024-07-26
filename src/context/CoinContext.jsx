import { createContext, useState, useEffect } from "react";
import { fetchAllCoins } from "../api/coinGecko";
import { getUsdToEurRate } from "../api/freecurrencyapi";
import { formatNumber } from "../utils/helpers";
import { toast } from "react-toastify";

export const CoinContext = createContext();

const CoinContextProvider = ({ children }) => {
	const [allCoins, setAllCoins] = useState([]);
	const [usdToEurRate, setUsdToEurRate] = useState([]);
	const [currency, setCurrency] = useState({ name: "usd", symbol: "$" });

	const loadAllCoins = async () => {
		try {
			const coins = await fetchAllCoins(currency.name);
			setAllCoins(coins);
		} catch (err) {
			toast.error(err);
		}
	};

	const loadUsdToEurRate = async () => {
		try {
			const rate = await getUsdToEurRate();
			setUsdToEurRate(rate);
		} catch (err) {
			toast.error(err);
		}
	};

	useEffect(() => {
		loadUsdToEurRate();
	}, []);

	useEffect(() => {
		loadAllCoins();
	}, [currency]);

	const convertCurrency = (price, currency) => {
		return currency === "usd"
			? formatNumber(price * usdToEurRate)
			: formatNumber(price * (1 / usdToEurRate));
	};

	const contextValue = {
		allCoins,
		currency,
		setCurrency,
		convertCurrency,
	};

	return (
		<CoinContext.Provider value={contextValue}>
			{children}
		</CoinContext.Provider>
	);
};

export default CoinContextProvider;
