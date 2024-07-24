import { useEffect, useState, useContext } from "react";
import {
	calculatePriceChangePercentage,
	calculateCoinProfitLoss,
} from "../utils/helpers";
import { CoinContext } from "../context/CoinContext";

function useMatchingCoins(inputCoins) {
	const [matchingCoins, setMatchingCoins] = useState([]);
	const { allCoins, currency, convertUsdToEur, convertEurToUsd } =
		useContext(CoinContext);

	useEffect(() => {
		const updatedMatchingCoins = allCoins
			.filter((coin) =>
				inputCoins.some((allocation) => allocation.id === coin.id)
			)
			.map((coin) => {
				const matchingAllocation = inputCoins.find(
					(allocation) => allocation.id === coin.id
				);

				const price_change_alltime = {};
				price_change_alltime[currency.name] =
					calculatePriceChangePercentage(
						matchingAllocation.price[currency.name],
						coin.current_price
					);

				const alltime_profit_loss = {};
				alltime_profit_loss[currency.name] = calculateCoinProfitLoss(
					matchingAllocation.quantity,
					matchingAllocation.price[currency.name],
					coin.current_price
				);

				if (currency.name === "usd") {
					price_change_alltime.eur = calculatePriceChangePercentage(
						matchingAllocation.price.eur,
						convertUsdToEur(coin.current_price)
					);
					alltime_profit_loss.eur = calculateCoinProfitLoss(
						matchingAllocation.quantity,
						matchingAllocation.price.eur,
						convertUsdToEur(coin.current_price)
					);
				} else if (currency.name === "eur") {
					price_change_alltime.usd = calculatePriceChangePercentage(
						matchingAllocation.price.usd,
						convertEurToUsd(coin.current_price)
					);
					alltime_profit_loss.usd = calculateCoinProfitLoss(
						matchingAllocation.quantity,
						matchingAllocation.price.usd,
						convertEurToUsd(coin.current_price)
					);
				}

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
