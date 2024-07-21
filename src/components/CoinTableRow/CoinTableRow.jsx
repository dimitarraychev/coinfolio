import React, { useContext } from "react";
import arrowUp from "../../assets/icons/arrow-up.svg";
import arrowDown from "../../assets/icons/arrow-down.svg";

import { Link } from "react-router-dom";
import { CoinContext } from "../../context/CoinContext";
import { formatPrice } from "../../utils/helpers";

const CoinTableRow = ({ coin, allocation }) => {
	const { currency } = useContext(CoinContext);
	const isPositivePriceChange = allocation
		? coin.price_change_alltime >= 0
		: coin.price_change_percentage_24h >= 0;

	return (
		<Link to={`/coin/${coin.id}`} className="table-layout">
			<p>{coin.market_cap_rank}</p>
			<div>
				<img src={coin.image} alt={coin.symbol} className="coin-img" />
				<div className="name-wrapper">
					<p>{coin.name}</p>
					<p className="symbol">{coin.symbol.toUpperCase()}</p>
				</div>
			</div>
			<p>
				{currency.symbol}
				{formatPrice(coin.current_price)}
			</p>

			{allocation ? (
				<div className="profit-loss-wrapper">
					<p
						className={
							isPositivePriceChange
								? "quantity green"
								: "quantity red"
						}
					>
						{isPositivePriceChange
							? `+${currency.symbol}${coin.alltime_profit_loss}`
							: `-${currency.symbol}${coin.alltime_profit_loss
									.toString()
									.substr(1)}`}
					</p>

					<p
						className={
							isPositivePriceChange
								? "change green"
								: "change red"
						}
					>
						{coin.price_change_alltime}%
						<img
							className="arrow"
							src={isPositivePriceChange ? arrowUp : arrowDown}
							alt="arrow"
						/>
					</p>
				</div>
			) : (
				<p
					className={
						isPositivePriceChange ? " change green" : "change red"
					}
				>
					{Math.floor(coin.price_change_percentage_24h * 100) / 100}%
					<img
						className="arrow"
						src={isPositivePriceChange ? arrowUp : arrowDown}
						alt="arrow"
					/>
				</p>
			)}
			{allocation ? (
				<div className="last-column">
					<p>
						{currency.symbol}
						{formatPrice(allocation.total)}
					</p>
					<p className="quantity">
						{allocation.quantity} {coin.symbol.toUpperCase()}
					</p>
				</div>
			) : (
				<p className="last-column">
					{currency.symbol}
					{coin.market_cap?.toLocaleString()}
				</p>
			)}
		</Link>
	);
};

export default CoinTableRow;
