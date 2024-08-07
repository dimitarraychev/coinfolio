import { useParams } from "react-router-dom";

import "./Coin.css";
import arrowUp from "../../assets/icons/arrow-up.svg";
import arrowDown from "../../assets/icons/arrow-down.svg";

import { useCoinContext } from "../../context/CoinContext";
import useGetCoinById from "../../api/coingecko/useGetCoinById";
import { formatPrice } from "../../utils/helpers";
import LineChart from "../../components/common/LineChart/LineChart";
import Loader from "../../components/common/Loader/Loader";

const Coin = () => {
	const { coinId } = useParams();
	const { currency } = useCoinContext();
	const { coin, historicalData, isLoading } = useGetCoinById(
		coinId,
		currency
	);

	if (isLoading)
		return (
			<section className="coin-details">
				<div className="loading">
					<Loader size="15rem" />
				</div>
			</section>
		);

	return (
		<section className="coin-details">
			<div className="coin-details-title">
				<img src={coin.image.large} alt={coin.id} />
				<h2>
					{coin.name} ({coin.symbol.toUpperCase()})
				</h2>
			</div>

			<div className="coin-details-chart">
				<LineChart historicalData={historicalData} />
			</div>

			<div className="current-price">
				<p className="label">Current Price</p>
				<h3
					className={
						coin.market_data.price_change_percentage_24h > 0
							? "price green"
							: "price red"
					}
				>
					{currency.symbol}
					{formatPrice(coin.market_data.current_price[currency.name])}
					<img
						src={
							coin.market_data.price_change_percentage_24h > 0
								? arrowUp
								: arrowDown
						}
						alt="arrow"
						className="arrow"
					/>
				</h3>
				<p
					className={
						coin.market_data.price_change_percentage_24h > 0
							? "percentage green"
							: "percentage red"
					}
				>
					{coin.market_data.price_change_percentage_24h > 0 && "+"}
					{`${formatPrice(
						coin.market_data.price_change_percentage_24h
					)}%`}
					(24h)
				</p>
			</div>

			<h3 className="statistics-title">Statistics</h3>

			<div className="coin-details-info">
				<ul>
					<li>Crypto Market Rank</li>
					<li>#{coin.market_cap_rank}</li>
				</ul>
				<ul>
					<li>Market Cap</li>
					<li>
						{currency.symbol}
						{coin.market_data.market_cap[
							currency.name
						].toLocaleString()}
					</li>
				</ul>
				<ul>
					<li>Total Supply</li>
					<li>
						{`${coin.market_data.total_supply.toLocaleString()} ${coin.symbol.toUpperCase()}`}
					</li>
				</ul>
				<ul>
					<li>Circulating Supply</li>
					<li>
						{`${coin.market_data.circulating_supply.toLocaleString()} ${coin.symbol.toUpperCase()}`}
					</li>
				</ul>
				<ul>
					<li>24 Hour High</li>
					<li>
						{currency.symbol}
						{formatPrice(coin.market_data.high_24h[currency.name])}
					</li>
				</ul>
				<ul>
					<li>24 Hour Low</li>
					<li>
						{currency.symbol}
						{formatPrice(coin.market_data.low_24h[currency.name])}
					</li>
				</ul>
				<ul>
					<li>All Time High</li>
					<li>
						{currency.symbol}
						{formatPrice(coin.market_data.ath[currency.name])}
						{` on ${new Date(
							coin.market_data.ath_date[currency.name]
						).toDateString()}`}
					</li>
				</ul>
				<ul>
					<li>All Time Low</li>
					<li>
						{currency.symbol}
						{formatPrice(coin.market_data.atl[currency.name])}
						{` on ${new Date(
							coin.market_data.atl_date[currency.name]
						).toDateString()}`}
					</li>
				</ul>
			</div>
		</section>
	);
};

export default Coin;
