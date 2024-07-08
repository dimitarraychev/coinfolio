import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Coin.css";

import { CoinContext } from "../../context/CoinContext";
import LineChart from "../../components/LineChart";
import Loader from "../../components/Loader/Loader";
import formatPrice from "../../utils/helpers";
import { fetchCoinData, fetchHistoricalData } from "../../api/coinGecko";

const Coin = () => {
	const { coinId } = useParams();
	const [coinData, setCoinData] = useState();
	const [historicalData, setHistoricalData] = useState();
	const { currency } = useContext(CoinContext);

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

	if (coinData && historicalData) {
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
				<div className="coin-details-info">
					<ul>
						<li>Crypto Market Rank</li>
						<li>{coinData.market_cap_rank}</li>
					</ul>
					<ul>
						<li>Current Price</li>
						<li>
							{currency.symbol}
							{formatPrice(
								coinData.market_data.current_price[
									currency.name
								]
							)}
						</li>
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
				</div>
			</section>
		);
	} else {
		return (
			<section className="coin-details">
				<div className="loading">
					<Loader size="15rem" />
				</div>
			</section>
		);
	}
};

export default Coin;
