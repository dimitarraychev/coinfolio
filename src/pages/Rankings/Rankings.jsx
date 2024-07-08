import React, { useContext, useEffect, useState } from "react";
import "./Rankings.css";
import arrowUp from "../../assets/icons/arrow-up.svg";
import arrowDown from "../../assets/icons/arrow-down.svg";
import CryptoTable from "../../components/CryptoTable/CryptoTable";
import CoinTableRow from "../../components/CoinTableRow";

import rankIcon from "../../assets/icons/rank-icon-white.svg";
import Loader from "../../components/Loader/Loader";

import { CoinContext } from "../../context/CoinContext";
import { useInView } from "react-intersection-observer";

const Rankings = () => {
	const { allCoins, globalMarketData } = useContext(CoinContext);
	const [displayCoins, setDisplayCoins] = useState([]);
	const { ref, inView } = useInView();
	const [page, setPage] = useState(1);
	const coinsPerPage = 10;
	const isPositiveCapChange =
		globalMarketData.data.market_cap_change_percentage_24h_usd > 0;

	useEffect(() => {
		setDisplayCoins(allCoins.slice(0, coinsPerPage * page));
	}, [allCoins, page]);

	useEffect(() => {
		if (inView && page < 10) {
			setTimeout(() => setPage((prevPage) => prevPage + 1), 1000);
		}
	}, [inView]);

	return (
		<section className="rankings">
			<h2 className="page-header">
				<img src={rankIcon} alt="rankings" />
				Rankings
			</h2>

			<div className="market-data">
				<div className="data-wrapper">
					<h6>Global Market Cap 24H: </h6>

					<h3 className={isPositiveCapChange ? "green" : "red"}>
						{Math.floor(
							globalMarketData.data
								.market_cap_change_percentage_24h_usd * 100
						) / 100}
						%
						<img
							className="arrow"
							src={isPositiveCapChange ? arrowUp : arrowDown}
							alt="arrow"
						/>
					</h3>
				</div>

				<div className="data-wrapper">
					<h6>Active Cryptocurrencies: </h6>
					<h3>{globalMarketData.data.active_cryptocurrencies}</h3>
				</div>
			</div>

			<CryptoTable
				columns={["#", "Coins", "Price", "24H Change", "Market Cap"]}
			>
				{displayCoins.map((item, index) => (
					<CoinTableRow item={item} key={index} />
				))}
				{page < 10 && (
					<div ref={ref} className="loading">
						<Loader />
					</div>
				)}
			</CryptoTable>
		</section>
	);
};

export default Rankings;
