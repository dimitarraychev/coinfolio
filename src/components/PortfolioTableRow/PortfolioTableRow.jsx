import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import arrowUp from "../../assets/icons/arrow-up.svg";
import arrowDown from "../../assets/icons/arrow-down.svg";

import Button from "../Button/Button";
import Loader from "../Loader/Loader";
import { useCoinContext } from "../../context/CoinContext";
import useMatchingCoins from "../../hooks/useMatchingCoins";
import { updatePortfolioMetrics } from "../../utils/portfolio";
import { formatPrice } from "../../utils/helpers";

const PortfolioTableRow = ({ portfolio, index }) => {
	const { currency } = useCoinContext();
	const { matchingCoins } = useMatchingCoins(portfolio.allocations);
	const [updatedPortfolio, setUpdatedPortfolio] = useState({});

	useEffect(() => {
		setUpdatedPortfolio((prevPortfolio) =>
			updatePortfolioMetrics(portfolio, matchingCoins, currency)
		);
	}, [matchingCoins, currency]);

	const followHandler = (e) => {
		e.preventDefault();
	};

	if (!updatedPortfolio.alltimeProfitLoss) return <Loader />;

	return (
		<Link className="table-layout" to={`/hub/${portfolio.id}`}>
			<p>{index}</p>
			<div className="portfolio-title">
				<p>{portfolio.title}</p>
				<p className="owner">@{portfolio.owner.displayName}</p>
			</div>

			<p>
				{currency.symbol}
				{formatPrice(portfolio.totalAllocation[currency.name])}
			</p>

			<div
				className={
					updatedPortfolio.isPositivePriceChange
						? "profit-loss-wrapper green"
						: "profit-loss-wrapper red"
				}
			>
				<p>
					{currency.symbol}
					{formatPrice(updatedPortfolio.alltimeProfitLoss)}
					<img
						src={
							updatedPortfolio.isPositivePriceChange
								? arrowUp
								: arrowDown
						}
						alt="arrow"
						className="arrow"
					/>
				</p>
				<p>
					{formatPrice(updatedPortfolio.alltimeProfitLossPercentage)}%
				</p>
			</div>

			<div className="last-column">
				<p>{portfolio.followers.length}</p>
				<Button text={"follow"} onClick={followHandler} />
			</div>
		</Link>
	);
};

export default PortfolioTableRow;
