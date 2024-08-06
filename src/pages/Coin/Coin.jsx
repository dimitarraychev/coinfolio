import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import "./Coin.css";
import arrowUp from "../../assets/icons/arrow-up.svg";
import arrowDown from "../../assets/icons/arrow-down.svg";

import { useCoinContext } from "../../context/CoinContext";
import { fetchCoinData, fetchHistoricalData } from "../../api/coinGecko";
import { formatPrice } from "../../utils/helpers";
import LineChart from "../../components/common/LineChart/LineChart";
import Loader from "../../components/common/Loader/Loader";

const Coin = () => {
	const { coinId } = useParams();
	const [coinData, setCoinData] = useState();
	const [historicalData, setHistoricalData] = useState();
	const { currency } = useCoinContext();

	const getData = async () => {
		try {
			const coinData = await fetchCoinData(coinId);
			setCoinData(coinData);

			const historicalData = await fetchHistoricalData(
				coinId,
				currency.name
			);
			setHistoricalData(historicalData);
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		getData();
	}, [coinId, currency]);

	if (!coinData || !historicalData)
		return (
			<section className="coin-details">
				<div className="loading">
					<Loader size="10rem" />
				</div>
			</section>
		);

	return (
		<section className="coin-details">
			<div className="coin-details-title">
				<img src={coinData.image.large} alt={coinData.id} />
				<h2>
					{coinData.name} ({coinData.symbol.toUpperCase()})
				</h2>
			</div>

			<div className="coin-details-chart">
				<LineChart historicalData={historicalData} />
			</div>

			<div className="current-price">
				<p className="label">Current Price</p>
				<h3
					className={
						coinData.market_data.price_change_percentage_24h > 0
							? "price green"
							: "price red"
					}
				>
					{currency.symbol}
					{formatPrice(
						coinData.market_data.current_price[currency.name]
					)}
					<img
						src={
							coinData.market_data.price_change_percentage_24h > 0
								? arrowUp
								: arrowDown
						}
						alt="arrow"
						className="arrow"
					/>
				</h3>
				<p
					className={
						coinData.market_data.price_change_percentage_24h > 0
							? "percentage green"
							: "percentage red"
					}
				>
					{coinData.market_data.price_change_percentage_24h > 0 &&
						"+"}
					{`${formatPrice(
						coinData.market_data.price_change_percentage_24h
					)}%`}
					(24h)
				</p>
			</div>

			<h3 className="statistics-title">Statistics</h3>

			<div className="coin-details-info">
				<ul>
					<li>Crypto Market Rank</li>
					<li>#{coinData.market_cap_rank}</li>
				</ul>
				<ul>
					<li>Market Cap</li>
					<li>
						{currency.symbol}
						{coinData.market_data.market_cap[
							currency.name
						].toLocaleString()}
					</li>
				</ul>
				<ul>
					<li>Total Supply</li>
					<li>
						{`${coinData.market_data.total_supply.toLocaleString()} ${coinData.symbol.toUpperCase()}`}
					</li>
				</ul>
				<ul>
					<li>Circulating Supply</li>
					<li>
						{`${coinData.market_data.circulating_supply.toLocaleString()} ${coinData.symbol.toUpperCase()}`}
					</li>
				</ul>
				<ul>
					<li>24 Hour High</li>
					<li>
						{currency.symbol}
						{formatPrice(
							coinData.market_data.high_24h[currency.name]
						)}
					</li>
				</ul>
				<ul>
					<li>24 Hour Low</li>
					<li>
						{currency.symbol}
						{formatPrice(
							coinData.market_data.low_24h[currency.name]
						)}
					</li>
				</ul>
				<ul>
					<li>All Time High</li>
					<li>
						{currency.symbol}
						{formatPrice(coinData.market_data.ath[currency.name])}
						{` on ${new Date(
							coinData.market_data.ath_date[currency.name]
						).toDateString()}`}
					</li>
				</ul>
				<ul>
					<li>All Time Low</li>
					<li>
						{currency.symbol}
						{formatPrice(coinData.market_data.atl[currency.name])}
						{` on ${new Date(
							coinData.market_data.atl_date[currency.name]
						).toDateString()}`}
					</li>
				</ul>
			</div>
		</section>
	);
};

export default Coin;
