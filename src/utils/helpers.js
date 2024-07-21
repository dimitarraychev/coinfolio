export function formatPrice(price) {
	const minimumFractionDigits = 2;
	const maximumFractionDigits = 8;

	if (price == null) return 0;

	return price.toLocaleString(undefined, {
		minimumFractionDigits,
		maximumFractionDigits,
	});
}

export const calculateAveragePrice = (price1, quantity1, price2, quantity2) => {
	if (quantity1 + quantity2 === 0) return 0;

	const totalCost = price1 * quantity1 + price2 * quantity2;
	const totalQuantity = quantity1 + quantity2;

	return totalCost / totalQuantity;
};

export const calculatePriceChangePercentage = (oldPrice, newPrice) => {
	const percentageChange = ((newPrice - oldPrice) / oldPrice) * 100;
	return percentageChange.toFixed(2);
};

export const calculateCurrentBalance = (coins) => {
	let currentBalance = 0;

	for (const coin of coins) {
		currentBalance += coin.quantity * coin.market_data.current_price;
	}

	return currentBalance.toFixed(2);
};

export const findTopPerformers = (coins) => {
	return coins
		.filter((c) => c.market_data.price_change_alltime >= 0)
		.sort(
			(a, b) =>
				a.market_data.price_change_alltime >
				b.market_data.price_change_alltime
		)
		.slice(0, 3)
		.map((c) => c.market_data.symbol.toUpperCase());
};

export const calculateCoinProfitLoss = (qty, initialPrice, currentPrice) => {
	const oldTotal = qty * initialPrice;
	const newTotal = qty * currentPrice;

	return formatPrice(newTotal - oldTotal);
};
