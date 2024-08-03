import { createContext, useState, useEffect, useContext } from "react";
import { fetchAllCoins } from "../api/coinGecko";
import { getUsdToEurRate } from "../api/freecurrencyapi";
import { formatNumber } from "../utils/helpers";
import { toast } from "react-toastify";

const CoinContext = createContext();

const CoinContextProvider = ({ children }) => {
	const [allCoins, setAllCoins] = useState([]);
	const [usdToEurRate, setUsdToEurRate] = useState(1);
	const [currency, setCurrency] = useState({ name: "usd", symbol: "$" });
	const [isLoadingCoins, setIsLoadingCoins] = useState(true);
	const [isLoadingRate, setIsLoadingRate] = useState(true);
	const [isError, setIsError] = useState(false);

	const loadAllCoins = async () => {
		try {
			const coins = await fetchAllCoins(currency.name);
			setAllCoins(coins);
		} catch (error) {
			setIsError(true);
			toast.error(error.message);
		} finally {
			setIsLoadingCoins(false);
		}
	};

	const loadUsdToEurRate = async () => {
		try {
			const rate = await getUsdToEurRate();
			setUsdToEurRate(rate);
		} catch (error) {
			setIsError(true);
			toast.error(error.message);
		} finally {
			setIsLoadingRate(false);
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
		isLoading: isLoadingCoins === true || isLoadingRate === true,
		isError,
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

export const useCoinContext = () => useContext(CoinContext);
