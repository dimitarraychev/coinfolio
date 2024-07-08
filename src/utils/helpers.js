export default function formatPrice(price) {
	const minimumFractionDigits = 2;
	const maximumFractionDigits = 8;

	if (price == null) return 0;

	return price.toLocaleString(undefined, {
		minimumFractionDigits,
		maximumFractionDigits,
	});
}
