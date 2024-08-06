import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import arrowUp from "../../assets/icons/arrow-up.svg";
import arrowDown from "../../assets/icons/arrow-down.svg";

import { useCoinContext } from "../../context/CoinContext";
import Button from "../Button/Button";
import Loader from "../Loader/Loader";
import useMatchingCoins from "../../hooks/useMatchingCoins";
import useFollowPortfolio from "../../hooks/useFollowPortfolio";
import { updatePortfolioMetrics } from "../../utils/portfolio";
import { formatPrice } from "../../utils/helpers";

const PortfolioTableRow = ({ portfolio, index }) => {
	const { currency } = useCoinContext();
	const { matchingCoins } = useMatchingCoins(portfolio.allocations);
	const [updatedPortfolio, setUpdatedPortfolio] = useState({});

	const setFollowers = (followers, followersCount) => {
		setUpdatedPortfolio((prevPortfolio) => ({
			...prevPortfolio,
			followers,
			followersCount,
		}));
	};

	const {
		isFollowing,
		isFollowButtonVisible,
		isFollowButtonDisabled,
		followHandler,
	} = useFollowPortfolio(updatedPortfolio, setFollowers);

	useEffect(() => {
		setUpdatedPortfolio((prevPortfolio) =>
			updatePortfolioMetrics(portfolio, matchingCoins, currency)
		);
	}, [matchingCoins, currency]);

	if (
		updatedPortfolio.alltimeProfitLoss !== 0 &&
		!updatedPortfolio.alltimeProfitLoss
	)
		return <Loader />;

	return (
		<Link className="table-layout" to={`/hub/${updatedPortfolio.id}`}>
			<p>{index}</p>
			<div className="portfolio-title">
				<p>{updatedPortfolio.title}</p>
				<p className="owner">@{updatedPortfolio.owner.displayName}</p>
			</div>

			<p className="total-allocation">
				{currency.symbol}
				{formatPrice(updatedPortfolio.totalAllocation[currency.name])}
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

			<div className="followers">
				<p>{updatedPortfolio.followersCount}</p>
				{isFollowButtonVisible && (
					<Button
						text={isFollowing ? "following" : "follow"}
						isDisabled={isFollowButtonDisabled}
						isGhost={isFollowing}
						onClick={followHandler}
					/>
				)}
			</div>
		</Link>
	);
};

export default PortfolioTableRow;
