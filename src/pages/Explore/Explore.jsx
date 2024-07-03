import React, { useContext, useEffect, useState } from "react";
import "./Explore.css";
import exploreIcon from "../../assets/icons/explore-icon-white.svg";

import { CoinContext } from "../../context/CoinContext";
import { Link } from "react-router-dom";
import CryptoTable from "../../components/CryptoTable/CryptoTable";

const Explore = () => {
	const { allCoins, currency } = useContext(CoinContext);
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

			<CryptoTable>
				{displayCoins.slice(0, 10).map((item, index) => (
					<Link
						to={`/coin/${item.id}`}
						className="table-layout"
						key={index}
					>
						<p>{item.market_cap_rank}</p>
						<div>
							<img src={item.image} alt={item.symbol} />
							<p>{item.name + " - " + item.symbol}</p>
						</div>
						<p>
							{currency.symbol}{" "}
							{item.current_price.toLocaleString()}
						</p>
						<p
							className={
								item.price_change_percentage_24h > 0
									? "green"
									: "red"
							}
						>
							{Math.floor(
								item.price_change_percentage_24h * 100
							) / 100}
						</p>
						<p className="market-cap">
							{currency.symbol} {item.market_cap.toLocaleString()}
						</p>
					</Link>
				))}
			</CryptoTable>
		</section>
	);
};

export default Explore;
