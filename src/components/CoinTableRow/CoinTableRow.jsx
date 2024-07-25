import React, { useContext } from "react";
import arrowUp from "../../assets/icons/arrow-up.svg";
import arrowDown from "../../assets/icons/arrow-down.svg";

import { Link } from "react-router-dom";
import { CoinContext } from "../../context/CoinContext";
import { formatPrice } from "../../utils/helpers";

const CoinTableRow = ({ coin, allocation }) => {
	const { currency } = useContext(CoinContext);
	const isPositivePriceChange = allocation
		? coin.price_change_alltime[currency.name] >= 0
		: coin.price_change_percentage_24h >= 0;

	return (
		<Link
			to={`/explore/${coin.id}`}
			className={allocation ? "table-layout" : "table-layout six-col"}
		>
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
			{!allocation && (
				<p
					className={
						coin.price_change_percentage_7d_in_currency >= 0
							? " change green"
							: "change red"
					}
				>
					{formatPrice(coin.price_change_percentage_7d_in_currency)}%
					<img
						className="arrow"
						src={
							coin.price_change_percentage_7d_in_currency >= 0
								? arrowUp
								: arrowDown
						}
						alt="arrow"
					/>
				</p>
			)}

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
							? `+${currency.symbol}${formatPrice(
									coin.alltime_profit_loss[currency.name]
							  )}`
							: `-${currency.symbol}${formatPrice(
									coin.alltime_profit_loss[currency.name]
							  ).slice(1)}`}
					</p>

					<p
						className={
							isPositivePriceChange
								? "change green"
								: "change red"
						}
					>
						{formatPrice(coin.price_change_alltime[currency.name])}%
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
					{formatPrice(coin.price_change_percentage_24h)}%
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
						{currency.name === "usd"
							? formatPrice(allocation.total.usd)
							: formatPrice(allocation.total.eur)}
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
