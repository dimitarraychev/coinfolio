import React, { useContext, useEffect, useState } from "react";
import "./Explore.css";
import exploreIcon from "../../assets/icons/explore-icon-white.svg";

import { CoinContext } from "../../context/CoinContext";
import CryptoTable from "../../components/CryptoTable";
import CoinTableRow from "../../components/CoinTableRow";
import { fetchAllCoins } from "../../api/coinGecko";
import Loader from "../../components/Loader/Loader";
import CategoriesMenu from "../../components/CategoriesMenu/CategoriesMenu";

const Explore = () => {
	const { allCoins, currency } = useContext(CoinContext);
	const [displayCoins, setDisplayCoins] = useState([]);
	const [input, setInput] = useState("");
	const [category, setCategory] = useState(null);
	const [isLoading, setIsLoading] = useState(false);

	const inputHandler = (e) => {
		setInput(e.target.value);

		if (e.target.value === "") {
			setDisplayCoins(allCoins);
		}
	};

	const categoriesHandler = (value) => {
		setIsLoading(true);
		setCategory(value);
	};

	const searchHandler = (e) => {
		e.preventDefault();
		setIsLoading(true);
		fetchCoins();
	};

	const fetchCoins = async () => {
		try {
			const coins = await fetchAllCoins(currency.name, category);
			if (input) {
				const filteredCoins = coins.filter((item) =>
					item.name.toLowerCase().includes(input.toLowerCase())
				);
				setDisplayCoins(filteredCoins);
			} else {
				setDisplayCoins(coins);
			}
			setIsLoading(false);
		} catch (error) {
			console.error("Failed to fetch coins:", error);
		}
	};

	useEffect(() => {
		fetchCoins();
	}, [category]);

	useEffect(() => {
		setDisplayCoins(allCoins);
	}, [allCoins]);

	return (
		<section className="explore">
			<h2 className="page-header">
				<img src={exploreIcon} alt="explore" />
				Explore
			</h2>

			<div className="search">
				<form onSubmit={searchHandler}>
					<input
						onChange={inputHandler}
						value={input}
						list="coinlist"
						type="text"
						placeholder="Search crypto..."
						required
					/>
					<datalist id="coinlist">
						{displayCoins.map((item, index) => (
							<option key={index} value={item.name} />
						))}
					</datalist>
					<button type="submit">Search</button>
				</form>
			</div>

			<CategoriesMenu
				category={category}
				onCategoryChange={categoriesHandler}
			/>

			<CryptoTable
				columns={["#", "Coins", "Price", "24H Change", "Market Cap"]}
			>
				{isLoading ? (
					<div className="loader-wrapper">
						<Loader size="10rem" />
					</div>
				) : (
					displayCoins.map((item, index) => (
						<CoinTableRow item={item} key={index} />
					))
				)}
			</CryptoTable>
		</section>
	);
};

export default Explore;
