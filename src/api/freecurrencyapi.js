import Freecurrencyapi from "@everapi/freecurrencyapi-js";
const API_KEY = import.meta.env.VITE_FREECURRENCYAPI_API_KEY;

const freecurrencyapi = new Freecurrencyapi(API_KEY);

export const getUsdToEurRate = async () => {
	const rate = await freecurrencyapi.latest({
		base_currency: "USD",
		currencies: "EUR",
	});

	return rate.data.EUR;
};
