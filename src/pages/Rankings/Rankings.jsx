import React, { useContext, useEffect, useState } from "react";
import "./Rankings.css";
import rankIcon from "../../assets/icons/rank-icon-white.svg";
import Loader from "../../components/Loader/Loader";

import { CoinContext } from "../../context/CoinContext";
import { useInView } from "react-intersection-observer";
import { CoinRankings } from "../../components/CoinRankings/CoinRankings";

const Rankings = () => {
	const { allCoins } = useContext(CoinContext);
	const [displayCoins, setDisplayCoins] = useState([]);
	const { ref, inView } = useInView();
	const [page, setPage] = useState(1);
	const coinsPerPage = 10;

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
			<div className="header-wrapper">
				<img src={rankIcon} alt="rankings" />
				<h2>Rankings</h2>
			</div>
			<div className="crypto-table">
				<div className="table-layout">
					<p>#</p>
					<p>Coins</p>
					<p>Price</p>
					<p style={{ textAlign: "center" }}>24H Change</p>
					<p className="market-cap">Market Cap</p>
				</div>

				{displayCoins.map((item, index) => (
					<CoinRankings item={item} key={index} />
				))}
				{page < 10 && (
					<div ref={ref} className="loading">
						<Loader />
					</div>
				)}
			</div>
		</section>
	);
};

export default Rankings;
