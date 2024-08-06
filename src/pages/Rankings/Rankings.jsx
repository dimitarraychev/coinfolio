import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import "./Rankings.css";
import arrowUp from "../../assets/icons/arrow-up.svg";
import arrowDown from "../../assets/icons/arrow-down.svg";
import rankIcon from "../../assets/icons/rank-icon-white.svg";
import arrowScroll from "../../assets/icons/arrow-scroll.svg";

import { useCoinContext } from "../../context/CoinContext";
import useSortTable from "../../hooks/useSortTable";
import { fetchGlobalMarketData } from "../../api/coinGecko";
import { formatPrice } from "../../utils/helpers";
import CryptoTable from "../../components/common/CryptoTable/CryptoTable";
import CoinTableRow from "../../components/common/CryptoTable/CoinTableRow/CoinTableRow";
import Loader from "../../components/common/Loader/Loader";

const Rankings = () => {
	const { allCoins } = useCoinContext();
	const [globalMarketData, setGlobalMarketData] = useState({});
	const [isLoading, setIsLoading] = useState(true);
	const {
		sortedCoins,
		selectedSortField,
		isAscendingOrder,
		tableSortHandler,
	} = useSortTable(allCoins, "_market-cap");

	const isPositiveCapChange =
		globalMarketData.data?.market_cap_change_percentage_24h_usd > 0;

	const loadGlobalMarketData = async (signal) => {
		try {
			const marketData = await fetchGlobalMarketData(signal);
			setGlobalMarketData(marketData);
		} catch (error) {
			toast.error(error.mesage);
		} finally {
			setIsLoading(false);
		}
	};

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
				<div className="data-wrapper market-cap">
					<p className="label">Global Market Cap 24H: </p>

					{isLoading ? (
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
					{isLoading ? (
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
					{isLoading ? (
						<Loader />
					) : (
						<h3>
							{formatPrice(
								globalMarketData.data?.active_cryptocurrencies
							)}
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
				type={"coin"}
				canSort={true}
				tableSortHandler={tableSortHandler}
				selectedSortField={selectedSortField}
				isAscendingOrder={isAscendingOrder}
			>
				{sortedCoins.map((coin) => (
					<CoinTableRow coin={coin} key={coin.id} />
				))}
				<div className="end-message-wrapper">
					<p className="end-message">
						That's all for now. Check back soon!
					</p>
					<img
						src={arrowScroll}
						alt="top"
						title="Back To Top"
						className="scroll-top-image"
						onClick={() =>
							window.scrollTo({
								top: 0,
								behavior: "smooth",
							})
						}
					/>
				</div>
			</CryptoTable>
		</section>
	);
};

export default Rankings;
