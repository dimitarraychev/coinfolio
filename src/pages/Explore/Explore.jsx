import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import "./Explore.css";
import exploreIcon from "../../assets/icons/explore-icon-white.svg";

import { useCoinContext } from "../../context/CoinContext";
import CryptoTable from "../../components/CryptoTable/CryptoTable";
import CoinTableRow from "../../components/CoinTableRow/CoinTableRow";
import { fetchAllCoins, searchAllCoins } from "../../api/coinGecko";
import Loader from "../../components/Loader/Loader";
import CategoriesMenu from "../../components/CategoriesMenu/CategoriesMenu";
import SearchBar from "../../components/SearchBar/SearchBar";
import { exploreCategories } from "../../constants/categories";
import { toast } from "react-toastify";

const Explore = () => {
	const { allCoins, currency } = useCoinContext();
	const [displayCoins, setDisplayCoins] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [searchParams, setSearchParams] = useSearchParams();
	const defaultCategory = "all";
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
		setDisplayCoins(filteredCoins);
		setIsLoading(false);

		// try {
		// 	const search = await searchAllCoins(input);
		// 	setDisplayCoins(search.coins);
		// 	setIsLoading(false);
		// } catch (error) {
		// 	console.error("Failed to fetch coins:", error);
		// }
	};

	const fetchCoins = async () => {
		try {
			const coins = await fetchAllCoins(currency.name, category);
			setDisplayCoins(coins);
			setIsLoading(false);
		} catch (error) {
			toast.error("Error! Failed to fetch coins: ", error);
		}
	};

	useEffect(() => {
		if (searchQuery) {
			searchCoins(searchQuery);
			return;
		}

		if (category === "all") {
			setDisplayCoins(allCoins);
			setIsLoading(false);
			return;
		}

		fetchCoins();
	}, [category, allCoins, currency, searchParams]);

	return (
		<section className="explore">
			<h2 className="page-header">
				<img src={exploreIcon} alt="explore" />
				Explore
			</h2>

			<SearchBar
				autofillSuggestions={allCoins}
				onSearch={searchHandler}
			/>

			<CategoriesMenu
				categories={exploreCategories}
				selectedCategory={category}
				defaultCategory={defaultCategory}
				onCategoryChange={categoriesHandler}
			/>

			<CryptoTable
				columns={[
					"#",
					"Coins",
					"Price",
					"24h Change",
					"7d Change",
					"Market Cap",
				]}
			>
				{isLoading ? (
					<div className="loading">
						<Loader />
					</div>
				) : (
					displayCoins.map((coin) => (
						<CoinTableRow coin={coin} key={coin.id} />
					))
				)}
			</CryptoTable>
		</section>
	);
};

export default Explore;
