import { useState, useEffect } from "react";
import { getUsdToEurRate } from "./freecurrencyapi";
import { formatNumber } from "../../utils/helpers";

const useGetExchangeRate = () => {
	const [exchangeRate, setExchangeRate] = useState(1);
	const [isLoading, setIsLoading] = useState(true);
	const [isError, setIsError] = useState(false);

	const getExchangeRate = async () => {
		try {
			const rate = await getUsdToEurRate();
			setExchangeRate(rate);
		} catch (error) {
			setIsError(true);
			toast.error(error.message);
		} finally {
			setIsLoading(false);
		}
	};

	const convertCurrency = (price, currency) => {
		return currency === "usd"
			? formatNumber(price * exchangeRate)
			: formatNumber(price * (1 / exchangeRate));
	};

	useEffect(() => {
		getExchangeRate();
	}, []);

	return {
		isLoading,
		isError,
		convertCurrency,
	};
};

export default useGetExchangeRate;
