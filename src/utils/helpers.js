export function formatPrice(price) {
	if (price === null || price === 0) return "0";

	let fractionDigits = 2;

	if (price < 0.01 && price > -0.01) fractionDigits = 4;
	if (price < 0.0001 && price > -0.0001) fractionDigits = 6;
	if (price < 0.000001 && price > -0.000001) fractionDigits = 8;

	const formattedPrice = price.toLocaleString(undefined, {
		minimumFractionDigits: fractionDigits,
		maximumFractionDigits: fractionDigits,
	});

	const [integerPart, decimalPart] = formattedPrice.split(".");

	if (decimalPart) {
		const trimmedDecimalPart = decimalPart.replace(/0+$/, "");
		return trimmedDecimalPart
			? `${integerPart}.${trimmedDecimalPart}`
			: integerPart;
	}

	return integerPart;
}

export function formatNumber(number) {
	if (number === null || number === 0) return 0;

	let fractionDigits = 2;

	if (number < 0.01 && number > -0.01) fractionDigits = 4;
	if (number < 0.0001 && number > -0.01) fractionDigits = 8;

	const factor = Math.pow(10, fractionDigits);

	return Math.ceil(number * factor) / factor;
}

export const calculateAveragePrice = (price1, quantity1, price2, quantity2) => {
	if (quantity1 + quantity2 === 0) return 0;

	const totalCost = price1 * quantity1 + price2 * quantity2;
	const totalQuantity = quantity1 + quantity2;

	return totalCost / totalQuantity;
};

export const calculatePriceChangePercentage = (oldPrice, newPrice) => {
	if (oldPrice === 0) return 0;

	const percentageChange = ((newPrice - oldPrice) / oldPrice) * 100;

	return isNaN(percentageChange) ? 0 : percentageChange;
};

export const calculateCurrentBalance = (coins) => {
	let currentBalance = 0;

	for (const coin of coins) {
		currentBalance += coin.quantity * coin.market_data.current_price;
	}

	return currentBalance;
};

export const findTopPerformers = (coins, currency) => {
	return coins
		.filter((c) => c.market_data.price_change_alltime[currency.name] >= 0)
		.sort(
			(a, b) =>
				a.market_data.price_change_alltime[currency.name] >
				b.market_data.price_change_alltime[currency.name]
		)
		.slice(0, 3)
		.map((c) => c.market_data.symbol.toUpperCase());
};

export const calculateCoinProfitLoss = (qty, initialPrice, currentPrice) => {
	const oldTotal = qty * initialPrice;
	const newTotal = qty * currentPrice;

	return newTotal - oldTotal;
};

export const convertKebabCase = (string) =>
	string
		.split("-")
		.map((e) => e[0].toUpperCase() + e.substring(1))
		.join(" ");
