import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import "./PortfolioDetails.css";
import arrowUp from "../../../assets/icons/arrow-up.svg";
import arrowDown from "../../../assets/icons/arrow-down.svg";
import editIcon from "../../../assets/icons/edit-icon.svg";

import { useCoinContext } from "../../../context/CoinContext";
import { useConfirmModalContext } from "../../../context/ConfirmModalContext";
import useFollowPortfolio from "../../../api/firebase/useFollowPortfolio";
import { formatPrice } from "../../../utils/helpers";
import { deletePortfolio } from "../../../api/firebase/db";
import Button from "../../../components/common/Button/Button";
import Loader from "../../../components/common/Loader/Loader";

const PortfolioDetails = ({
	portfolio,
	isEditMode,
	onEditModeToggle,
	onTitleChange,
	onSave,
	isSaveButtonDisabled,
	setFollowers,
}) => {
	const navigate = useNavigate();
	const { currency } = useCoinContext();
	const { openConfirmModal } = useConfirmModalContext();
	const [isLoading, setIsLoading] = useState(false);
	const {
		isFollowing,
		isFollowButtonVisible,
		isFollowButtonDisabled,
		followHandler,
	} = useFollowPortfolio(portfolio, setFollowers);

	const isEditButtonVisible = !isFollowButtonVisible;

	const portfolioDeleteHandler = (e) => {
		if (isLoading) return;

		openConfirmModal(
			"Are you sure you want to delete this portfolio?",
			async () => {
				setIsLoading(true);

				try {
					await deletePortfolio(portfolio.id);
					toast.success(
						`Success! ${portfolio.title} was successfully removed.`
					);

					navigate("/hub");
				} catch (error) {
					toast.error(error.message);
				} finally {
					setIsLoading(false);
				}
			}
		);
	};

	if (!portfolio.currentBalance && portfolio.currentBalance !== 0)
		return <Loader />;

	return (
		<div className="portfolio-details">
			<div className="title-wrapper">
				<div className="title">
					<h2
						className="editable-title"
						contentEditable={isEditMode ? true : false}
						onInput={onTitleChange}
						suppressContentEditableWarning={true}
					>
						{portfolio.title}
					</h2>
					{isEditMode && (
						<img src={editIcon} alt="edit" className="edit-img" />
					)}
				</div>
				<p className="owner">@{portfolio.owner.displayName}</p>
				{isEditMode ? (
					<div className="btn-wrapper">
						<Button
							text={"save"}
							onClick={onSave}
							isDisabled={isSaveButtonDisabled}
						/>
						<Button
							text={"delete"}
							onClick={portfolioDeleteHandler}
						/>
					</div>
				) : (
					isEditButtonVisible && (
						<Button
							text={"edit"}
							isGhost={true}
							onClick={onEditModeToggle}
						/>
					)
				)}
			</div>
			<div className="followers-wrapper">
				<p className="label">Followers</p>
				<div className="follower-bottom">
					<h5>{portfolio.followersCount.toLocaleString()}</h5>
					{isFollowButtonVisible && (
						<Button
							text={isFollowing ? "following" : "follow"}
							isDisabled={isFollowButtonDisabled}
							isGhost={isFollowing}
							onClick={followHandler}
						/>
					)}
				</div>
			</div>
			<div className="current-balance-wrapper">
				<p className="label">Current Balance</p>
				<h3
					className={
						portfolio.isPositivePriceChange ? "green" : "red"
					}
					id="current-balance"
				>
					{currency.symbol}
					{formatPrice(portfolio.currentBalance)}
					<img
						src={
							portfolio.isPositivePriceChange
								? arrowUp
								: arrowDown
						}
						alt="arrow"
						className="arrow"
					/>
				</h3>
			</div>
			<div className="info">
				<ul>
					<li>Alltime Profit/Loss</li>
					<li
						className={
							portfolio.isPositivePriceChange ? "green" : "red"
						}
					>
						{currency.symbol}
						{`${formatPrice(
							portfolio.alltimeProfitLoss
						)} (${formatPrice(
							portfolio.alltimeProfitLossPercentage
						)}%)`}
						<img
							src={
								portfolio.isPositivePriceChange
									? arrowUp
									: arrowDown
							}
							alt="arrow"
							className="arrow"
						/>
					</li>
				</ul>
				<ul>
					<li>Top Performers</li>
					<li>
						{portfolio.topPerformers.length > 0
							? portfolio.topPerformers.join(", ")
							: "-"}
					</li>
				</ul>
				<ul>
					<li>Total Allocation</li>
					<li>
						{currency.symbol}
						{formatPrice(portfolio.totalAllocation[currency.name])}
					</li>
				</ul>
				<ul>
					<li>Created On</li>
					<li>{new Date(portfolio.createdOn).toDateString()}</li>
				</ul>
				<ul>
					<li>Updated On</li>
					<li>{new Date(portfolio.updatedOn).toDateString()}</li>
				</ul>
			</div>
		</div>
	);
};

export default PortfolioDetails;
