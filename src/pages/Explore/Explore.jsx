import "./Explore.css";
import exploreIcon from "../../assets/icons/explore-icon-white.svg";

import { useCoinContext } from "../../context/CoinContext";
import CryptoTable from "../../components/CryptoTable/CryptoTable";
import CoinTableRow from "../../components/CoinTableRow/CoinTableRow";
import Loader from "../../components/Loader/Loader";
import CategoriesMenu from "../../components/CategoriesMenu/CategoriesMenu";
import SearchBar from "../../components/SearchBar/SearchBar";
import useGetCoins from "../../hooks/useGetCoins";
import { exploreCategories } from "../../constants/categories";

const Explore = () => {
	const { allCoins, currency } = useCoinContext();
	const defaultCategory = "all";

	const { coins, category, isLoading, categoriesHandler, searchHandler } =
		useGetCoins(defaultCategory, allCoins, currency);

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
				type={"coin"}
			>
				{isLoading ? (
					<div className="loading">
						<Loader />
					</div>
				) : (
					coins.map((coin) => (
						<CoinTableRow coin={coin} key={coin.id} />
					))
				)}
				{!isLoading && (
					<p className="end-message">
						That's everything! How about trying a different
						category?
					</p>
				)}
			</CryptoTable>
		</section>
	);
};

export default Explore;
