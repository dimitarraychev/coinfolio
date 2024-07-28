import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useInView } from "react-intersection-observer";

import "./Rankings.css";
import arrowUp from "../../assets/icons/arrow-up.svg";
import arrowDown from "../../assets/icons/arrow-down.svg";
import rankIcon from "../../assets/icons/rank-icon-white.svg";

import { useCoinContext } from "../../context/CoinContext";
import CryptoTable from "../../components/CryptoTable/CryptoTable";
import CoinTableRow from "../../components/CoinTableRow/CoinTableRow";
import Loader from "../../components/Loader/Loader";
import { formatPrice } from "../../utils/helpers";
import { fetchGlobalMarketData } from "../../api/coinGecko";

const Rankings = () => {
	const { allCoins } = useCoinContext();
	const [globalMarketData, setGlobalMarketData] = useState({});
	const [displayCoins, setDisplayCoins] = useState([]);
	const [page, setPage] = useState(1);
	const { ref, inView } = useInView();

	const coinsPerPage = 50;
	const isPositiveCapChange =
		globalMarketData.data?.market_cap_change_percentage_24h_usd > 0;

	const loadGlobalMarketData = async () => {
		try {
			const marketData = await fetchGlobalMarketData();
			setGlobalMarketData(marketData);
		} catch (err) {
			toast.error(err);
		}
	};

	useEffect(() => {
		setDisplayCoins(allCoins.slice(0, coinsPerPage * page));
	}, [allCoins, page]);

	useEffect(() => {
		if (inView && page < 5) {
			setTimeout(() => setPage((prevPage) => prevPage + 1), 1000);
		}
	}, [inView]);

	useEffect(() => {
		const controller = new AbortController();
		loadGlobalMarketData(controller.signal);

		return () => controller.abort();
	}, []);

	return (
		<section className="rankings">
			<h2 className="page-header">
				<img src={rankIcon} alt="rankings" />
				Rankings
			</h2>

			<div className="market-data">
				<div className="data-wrapper">
					<p className="label">Global Market Cap 24H: </p>

					{!globalMarketData.data ? (
						<Loader />
					) : (
						<h3 className={isPositiveCapChange ? "green" : "red"}>
							{formatPrice(
								globalMarketData.data
									.market_cap_change_percentage_24h_usd
							)}
							%
							<img
								className="arrow"
								src={isPositiveCapChange ? arrowUp : arrowDown}
								alt="arrow"
							/>
						</h3>
					)}
				</div>

				<div className="data-wrapper">
					<p className="label">BTC Dominance: </p>
					{!globalMarketData.data ? (
						<Loader />
					) : (
						<h3>
							{formatPrice(
								globalMarketData.data.market_cap_percentage.btc
							)}
							%
						</h3>
					)}
				</div>

				<div className="data-wrapper">
					<p className="label">Active Cryptocurrencies: </p>
					{!globalMarketData.data ? (
						<Loader />
					) : (
						<h3>
							{formatPrice(
								globalMarketData.data?.active_cryptocurrencies
							).slice(0, -3)}
						</h3>
					)}
				</div>
			</div>

			<CryptoTable
				columns={[
					"#",
					"Coins",
					"Price",
					"24h Change",
					"7d Change",
					"Market Cap",
				]}
			>
				{displayCoins.map((coin) => (
					<CoinTableRow coin={coin} key={coin.id} />
				))}
				{page < 5 && (
					<div ref={ref} className="loading">
						<Loader />
					</div>
				)}
			</CryptoTable>
		</section>
	);
};

export default Rankings;
