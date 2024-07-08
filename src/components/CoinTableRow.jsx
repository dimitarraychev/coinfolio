import React, { useContext } from "react";
import arrowUp from "../assets/icons/arrow-up.svg";
import arrowDown from "../assets/icons/arrow-down.svg";

import { Link } from "react-router-dom";
import { CoinContext } from "../context/CoinContext";
import formatPrice from "../utils/helpers";

const CoinTableRow = ({ item }) => {
	const { currency } = useContext(CoinContext);
	const isPositivePriceChange = item.price_change_percentage_24h > 0;

	return (
		<Link to={`/coin/${item.id}`} className="table-layout">
			<p>{item.market_cap_rank}</p>
			<div>
				<img src={item.image} alt={item.symbol} />
				<p>{item.name + " - " + item.symbol.toUpperCase()}</p>
			</div>
			<p>
				{currency.symbol}
				{formatPrice(item.current_price)}
			</p>
			<p className={isPositivePriceChange ? "green" : "red"}>
				{Math.floor(item.price_change_percentage_24h * 100) / 100}%
				<img
					className="arrow"
					src={isPositivePriceChange ? arrowUp : arrowDown}
					alt="arrow"
				/>
			</p>
			<p>
				{currency.symbol}
				{item.market_cap?.toLocaleString()}
			</p>
		</Link>
	);
};

export default CoinTableRow;
