import React, { useContext, useEffect, useState } from "react";
import "./Explore.css";
import exploreIcon from "../../assets/icons/explore-icon-white.svg";
import categoriesIcon from "../../assets/icons/categories-icon.svg";
import { categories } from "../../constants/index";

import { CoinContext } from "../../context/CoinContext";
import CryptoTable from "../../components/CryptoTable/CryptoTable";
import CoinTableRow from "../../components/CoinTableRow/CoinTableRow";
import { fetchAllCoins } from "../../api/coinGecko";

const Explore = () => {
	const { allCoins, currency } = useContext(CoinContext);
	const [displayCoins, setDisplayCoins] = useState([]);
	const [input, setInput] = useState("");
	const [category, setCategory] = useState("");

	const inputHandler = (e) => {
		setInput(e.target.value);

		if (e.target.value === "") {
			setDisplayCoins(allCoins);
		}
	};

	const categoriesHandler = (value) => {
		setCategory(value);
	};

	const searchHandler = (e) => {
		e.preventDefault();
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
			<div className="header-wrapper">
				<img src={exploreIcon} alt="explore" />
				<h2>Explore</h2>
			</div>

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

			<div className="categories-wrapper">
				<p className="categories">
					<img src={categoriesIcon} alt="filter" />
					Categories
				</p>
				<ul className="categories-list">
					{categories.map((cat) => (
						<li
							key={cat.category_id}
							onClick={() => categoriesHandler(cat.category_id)}
						>
							{cat.name}
						</li>
					))}
				</ul>
			</div>

			<CryptoTable>
				{displayCoins.slice(0, 10).map((item, index) => (
					<CoinTableRow item={item} key={index} />
				))}
			</CryptoTable>
		</section>
	);
};

export default Explore;
