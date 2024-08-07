import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";

import { fetchAllCoins, searchAllCoins } from "./coingecko";

const useGetCoins = (defaultCategory, allCoins, currency) => {
	const [coins, setCoins] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [searchParams, setSearchParams] = useSearchParams();

	const category = searchParams.get("category");
	const searchQuery = searchParams.get("search");

	const categoriesHandler = (value) => {
		if (searchParams.get("category") === value) return;
		setIsLoading(true);
		setSearchParams({ category: value });
	};

	const searchHandler = (input) => {
		if (!input) return;
		setIsLoading(true);
		setSearchParams({ search: input });
	};

	const searchCoins = async (input) => {
		const filteredCoins = allCoins.filter((coin) =>
			coin.name.toLowerCase().includes(input.toLowerCase())
		);
		setCoins(filteredCoins);
		setIsLoading(false);

		// try {
		// 	const search = await searchAllCoins(input);
		// 	setCoins(search.coins);
		// 	setIsLoading(false);
		// } catch (error) {
		// 	console.error("Failed to fetch coins:", error);
		// }
	};

	const fetchCoins = async () => {
		try {
			const coins = await fetchAllCoins(currency.name, category);
			setCoins(coins);
		} catch (error) {
			toast.error("Error! Failed to fetch coins: ", error.message);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		if (searchQuery) {
			searchCoins(searchQuery);
			return;
		}

		if (category === "all") {
			setCoins(allCoins);
			setIsLoading(false);
			return;
		}

		fetchCoins();
	}, [category, allCoins, currency, searchParams]);

	return {
		coins,
		category,
		isLoading,
		categoriesHandler,
		searchHandler,
	};
};

export default useGetCoins;
