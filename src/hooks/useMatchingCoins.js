import { useEffect, useState, useContext } from "react";
import {
	calculatePriceChangePercentage,
	calculateCoinProfitLoss,
} from "../utils/helpers";
import { CoinContext } from "../context/CoinContext";

function useMatchingCoins(inputCoins) {
	const [matchingCoins, setMatchingCoins] = useState([]);
	const { allCoins, currency, convertCurrency } = useContext(CoinContext);

	useEffect(() => {
		const updatedMatchingCoins = allCoins
			.filter((coin) =>
				inputCoins.some((allocation) => allocation.id === coin.id)
			)
			.map((coin) => {
				const matchingAllocation = inputCoins.find(
					(allocation) => allocation.id === coin.id
				);

				const convertedCurrency =
					currency.name === "usd" ? "eur" : "usd";

				const price_change_alltime = {
					[currency.name]: calculatePriceChangePercentage(
						matchingAllocation.price[currency.name],
						coin.current_price
					),
					[convertedCurrency]: calculatePriceChangePercentage(
						matchingAllocation.price[convertedCurrency],
						convertCurrency(coin.current_price, currency.name)
					),
				};

				const alltime_profit_loss = {
					[currency.name]: calculateCoinProfitLoss(
						matchingAllocation.quantity,
						matchingAllocation.price[currency.name],
						coin.current_price
					),
					[convertedCurrency]: calculateCoinProfitLoss(
						matchingAllocation.quantity,
						matchingAllocation.price[convertCurrency],
						convertCurrency(coin.current_price, currency.name)
					),
				};

				return {
					...matchingAllocation,
					market_data: {
						...coin,
						price_change_alltime,
						alltime_profit_loss,
					},
				};
			});

		setMatchingCoins(updatedMatchingCoins);
	}, [inputCoins, allCoins]);

	return { matchingCoins };
}

export default useMatchingCoins;
