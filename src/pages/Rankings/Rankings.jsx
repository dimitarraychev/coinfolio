import React, { useContext, useEffect, useState } from "react";
import "./Rankings.css";
import rankIcon from "../../assets/icons/rank-icon-white.svg";
import Loader from "../../components/Loader/Loader";

import { CoinContext } from "../../context/CoinContext";
import { Link } from "react-router-dom";
import { useInView } from "react-intersection-observer";

const Rankings = () => {
	const { allCoins, currency } = useContext(CoinContext);
	const [displayCoins, setDisplayCoins] = useState([]);
	const { ref, inView } = useInView();
	const [page, setPage] = useState(1);
	const coinsPerPage = 10;

	useEffect(() => {
		setDisplayCoins(allCoins.slice(0, coinsPerPage * page));
	}, [allCoins, page]);

	useEffect(() => {
		if (inView) {
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
					<Link
						to={`/coin/${item.id}`}
						className="table-layout"
						key={index}
					>
						<p>{item.market_cap_rank}</p>
						<div>
							<img src={item.image} alt={item.symbol} />
							<p>{item.name + " - " + item.symbol}</p>
						</div>
						<p>
							{currency.symbol}{" "}
							{item.current_price.toLocaleString()}
						</p>
						<p
							className={
								item.price_change_percentage_24h > 0
									? "green"
									: "red"
							}
						>
							{Math.floor(
								item.price_change_percentage_24h * 100
							) / 100}
						</p>
						<p className="market-cap">
							{currency.symbol} {item.market_cap.toLocaleString()}
						</p>
					</Link>
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
