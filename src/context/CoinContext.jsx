import { createContext, useState, useEffect, useContext } from "react";
import { fetchAllCoins } from "../api/coingecko/coingecko";
import { toast } from "react-toastify";
import useGetExchangeRate from "../api/freecurrencyapi/useGetExchangeRate";

const CoinContext = createContext();

const CoinContextProvider = ({ children }) => {
	const [allCoins, setAllCoins] = useState([]);
	const [currency, setCurrency] = useState({ name: "usd", symbol: "$" });
	const [isLoadingCoins, setIsLoadingCoins] = useState(true);
	const [isError, setIsError] = useState(false);

	const {
		convertCurrency,
		isLoading: isLoadingRate,
		isError: isErrorRate,
	} = useGetExchangeRate();

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

	useEffect(() => {
		loadAllCoins();
	}, [currency]);

	const contextValue = {
		allCoins,
		currency,
		isLoading: isLoadingCoins || isLoadingRate,
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
