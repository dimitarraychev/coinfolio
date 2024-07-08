const API_BASE_URL = "https://api.coingecko.com/api/v3";
const API_KEY = "CG-m1zpVwoWPMSFhtQz7E1tRbYe";

export const fetchAllCoins = async (currency, category) => {
	const options = {
		method: "GET",
		headers: {
			accept: "application/json",
			"x-cg-demo-api-key": API_KEY,
		},
	};

	let URL = `${API_BASE_URL}/coins/markets?vs_currency=${currency}`;
	if (category && category != null) URL = URL + `&category=${category}`;

	const response = await fetch(URL, options);
	if (!response.ok) {
		throw new Error("Failed to fetch coins data");
	}
	return response.json();
};

export const fetchGlobalMarketData = async () => {
	const options = {
		method: "GET",
		headers: {
			accept: "application/json",
			"x-cg-demo-api-key": API_KEY,
		},
	};

	const response = await fetch(`${API_BASE_URL}/global`, options);
	if (!response.ok) {
		throw new Error("Failed to fetch global market data");
	}
	return response.json();
};

export const fetchCoinData = async (coinId) => {
	const options = {
		method: "GET",
		headers: {
			accept: "application/json",
			"x-cg-demo-api-key": API_KEY,
		},
	};

	const response = await fetch(`${API_BASE_URL}/coins/${coinId}`, options);
	if (!response.ok) {
		throw new Error("Failed to fetch coin data");
	}
	return response.json();
};

export const fetchHistoricalData = async (coinId, currency) => {
	const options = {
		method: "GET",
		headers: {
			accept: "application/json",
			"x-cg-demo-api-key": API_KEY,
		},
	};

	const response = await fetch(
		`${API_BASE_URL}/coins/${coinId}/market_chart?vs_currency=${currency}&days=10&interval=daily`,
		options
	);
	if (!response.ok) {
		throw new Error("Failed to fetch historical data");
	}
};

export const searchAllCoins = async (query) => {
	const options = {
		method: "GET",
		headers: { accept: "application/json", "x-cg-demo-api-key": API_KEY },
	};

	const response = await fetch(
		`${API_BASE_URL}/search?query=${query}`,
		options
	);

	if (!response.ok) {
		throw new Error("Failed to fetch search data");
	}

	return response.json();
};
