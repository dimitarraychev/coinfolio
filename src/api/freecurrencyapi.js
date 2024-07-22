import Freecurrencyapi from "@everapi/freecurrencyapi-js";
const API_KEY = "fca_live_JdmAbTQ6QVqyo4ZtHAo2kKRWY4UXExHBtjn99uTD";

const freecurrencyapi = new Freecurrencyapi(API_KEY);

export const getUsdToEurRate = async () => {
	const rate = await freecurrencyapi.latest({
		base_currency: "USD",
		currencies: "EUR",
	});

	return rate.data.EUR;
};
