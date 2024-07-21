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
