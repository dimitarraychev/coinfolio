import React, { useContext } from "react";
import arrowUp from "../../assets/icons/arrow-up.svg";
import arrowDown from "../../assets/icons/arrow-down.svg";

import { Link } from "react-router-dom";
import { CoinContext } from "../../context/CoinContext";
import {
	calculatePriceChangePercentage,
	formatPrice,
} from "../../utils/helpers";

const CoinTableRow = ({ coin, allocation }) => {
	const { currency } = useContext(CoinContext);
	const isPositivePriceChange = allocation
		? coin.current_price > allocation.price
		: coin.price_change_percentage_24h > 0;

	return (
		<Link to={`/coin/${coin.id}`} className="table-layout">
			<p>{coin.market_cap_rank}</p>
			<div>
				<img src={coin.image} alt={coin.symbol} />
				<p>{coin.name + " - " + coin.symbol.toUpperCase()}</p>
			</div>
			<p>
				{currency.symbol}
				{formatPrice(coin.current_price)}
			</p>
			<p className={isPositivePriceChange ? "green" : "red"}>
				{allocation
					? calculatePriceChangePercentage(
							allocation.price,
							coin.current_price
					  )
					: Math.floor(coin.price_change_percentage_24h * 100) / 100}
				%
				<img
					className="arrow"
					src={isPositivePriceChange ? arrowUp : arrowDown}
					alt="arrow"
				/>
			</p>
			<p>
				{currency.symbol}
				{allocation
					? allocation.total
					: coin.market_cap?.toLocaleString()}
			</p>
		</Link>
	);
};

export default CoinTableRow;
