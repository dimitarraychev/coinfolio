const API_BASE_URL = import.meta.env.VITE_COINGECKO_API_URL;
const API_KEY = import.meta.env.VITE_COINGECKO_API_KEY;

export const fetchAllCoins = async (currency, category, page = 1) => {
	const options = {
		method: "GET",
		headers: {
			accept: "application/json",
			"x-cg-demo-api-key": API_KEY,
		},
	};

	let URL = `${API_BASE_URL}/coins/markets?vs_currency=${currency}&per_page=250&page=${page}&price_change_percentage=7d`;
	if (category && category != null) URL = URL + `&category=${category}`;

	const response = await fetch(URL, options);
	if (!response.ok) {
		throw new Error("Failed to fetch coins data");
	}
	return response.json();
};

export const fetchGlobalMarketData = async (signal) => {
	const options = {
		method: "GET",
		headers: {
			accept: "application/json",
			"x-cg-demo-api-key": API_KEY,
		},
		signal,
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

	return response.json();
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
