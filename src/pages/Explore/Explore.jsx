import React, { useContext, useEffect, useState } from "react";
import "./Explore.css";
import exploreIcon from "../../assets/icons/explore-icon-white.svg";
import categoriesIcon from "../../assets/icons/categories-icon.svg";

import { CoinContext } from "../../context/CoinContext";
import CryptoTable from "../../components/CryptoTable/CryptoTable";
import CoinTableRow from "../../components/CoinTableRow/CoinTableRow";

const Explore = () => {
	const { allCoins } = useContext(CoinContext);
	const [displayCoins, setDisplayCoins] = useState([]);
	const [input, setInput] = useState("");

	const inputHandler = (e) => {
		setInput(e.target.value);

		if (e.target.value === "") {
			setDisplayCoins(allCoins);
		}
	};

	const searchHandler = async (e) => {
		e.preventDefault();

		const coins = await allCoins.filter((item) => {
			return item.name.toLowerCase().includes(input.toLowerCase());
		});

		setDisplayCoins(coins);
	};

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
						{allCoins.map((item, index) => (
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
					<li>All</li>
					<li>Layer 1</li>
					<li>Layer 2</li>
					<li>DeFi</li>
					<li>Stablecoins</li>
					<li>AI</li>
					<li>Storage</li>
					<li>Meme</li>
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
