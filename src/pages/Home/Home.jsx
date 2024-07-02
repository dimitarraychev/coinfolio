import React, { useContext, useEffect, useState } from "react";
import "./Home.css";
import { CoinContext } from "../../context/CoinContext";

const Home = () => {
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
		<div className="home">
			<div className="hero">
				<h1>
					Largest <br /> Crypto Marketplace
				</h1>
				<p>
					Lorem ipsum dolor sit amet, consectetur adipisicing elit.
					Et, inventore reiciendis iusto blanditiis illo nobis.
					Cupiditate sed in ea totam voluptatum iure iusto accusantium
					nisi, ducimus mollitia tempora, amet ratione!
				</p>

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

			<div className="crypto-table">
				<div className="table-layout">
					<p>#</p>
					<p>Coins</p>
					<p>Price</p>
					<p style={{ textAlign: "center" }}>24H Change</p>
					<p className="market-cap">Market Cap</p>
				</div>

				{displayCoins.slice(0, 10).map((item, index) => (
					<div className="table-layout" key={index}>
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
					</div>
				))}
			</div>
		</div>
	);
};

export default Home;
