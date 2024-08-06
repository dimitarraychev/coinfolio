import "./Explore.css";
import exploreIcon from "../../assets/icons/explore-icon-white.svg";
import arrowScroll from "../../assets/icons/arrow-scroll.svg";

import { useCoinContext } from "../../context/CoinContext";
import useGetCoins from "../../hooks/useGetCoins";
import useSortTable from "../../hooks/useSortTable";
import CryptoTable from "../../components/common/CryptoTable/CryptoTable";
import CoinTableRow from "../../components/common/CryptoTable/CoinTableRow/CoinTableRow";
import Loader from "../../components/common/Loader/Loader";
import CategoriesMenu from "../../components/common/CategoriesMenu/CategoriesMenu";
import SearchBar from "../../components/common/SearchBar/SearchBar";
import { exploreCategories } from "../../constants/categories";

const Explore = () => {
	const { allCoins, currency } = useCoinContext();
	const defaultCategory = "all";

	const { coins, category, isLoading, categoriesHandler, searchHandler } =
		useGetCoins(defaultCategory, allCoins, currency);

	const {
		sortedCoins,
		selectedSortField,
		isAscendingOrder,
		tableSortHandler,
	} = useSortTable(coins, "_market-cap");

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
				canSort={true}
				tableSortHandler={tableSortHandler}
				selectedSortField={selectedSortField}
				isAscendingOrder={isAscendingOrder}
			>
				{isLoading ? (
					<div className="loading">
						<Loader />
					</div>
				) : (
					sortedCoins.map((coin) => (
						<CoinTableRow coin={coin} key={coin.id} />
					))
				)}

				{!isLoading && (
					<div className="end-message-wrapper">
						<p className="end-message">
							That's everything! How about trying a different
							category?
						</p>
						<img
							src={arrowScroll}
							alt="top"
							title="Back To Top"
							className="scroll-top-image"
							onClick={() =>
								window.scrollTo({
									top: 0,
									behavior: "smooth",
								})
							}
						/>
					</div>
				)}
			</CryptoTable>
		</section>
	);
};

export default Explore;
