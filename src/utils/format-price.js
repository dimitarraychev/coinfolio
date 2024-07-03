export default function formatPrice(price) {
	const minimumFractionDigits = 2;
	const maximumFractionDigits = 8;

	return price.toLocaleString(undefined, {
		minimumFractionDigits,
		maximumFractionDigits,
	});
}
