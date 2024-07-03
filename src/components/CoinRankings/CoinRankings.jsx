import React, { useContext } from "react";
import "./CoinRankings.css";
import { Link } from "react-router-dom";
import { CoinContext } from "../../context/CoinContext";
import formatPrice from "../../utils/format-price";

export const CoinRankings = ({ item }) => {
	const { allCoins, currency } = useContext(CoinContext);

	return (
		<Link to={`/coin/${item.id}`} className="table-layout">
			<p>{item.market_cap_rank}</p>
			<div>
				<img src={item.image} alt={item.symbol} />
				<p>{item.name + " - " + item.symbol.toUpperCase()}</p>
			</div>
			<p>
				{currency.symbol} {formatPrice(item.current_price)}
			</p>
			<p
				className={
					item.price_change_percentage_24h > 0 ? "green" : "red"
				}
			>
				{Math.floor(item.price_change_percentage_24h * 100) / 100}
			</p>
			<p className="market-cap">
				{currency.symbol} {item.market_cap.toLocaleString()}
			</p>
		</Link>
	);
};
