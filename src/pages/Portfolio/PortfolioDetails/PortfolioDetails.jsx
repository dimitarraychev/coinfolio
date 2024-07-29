import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import "./PortfolioDetails.css";
import arrowUp from "../../../assets/icons/arrow-up.svg";
import arrowDown from "../../../assets/icons/arrow-down.svg";
import editIcon from "../../../assets/icons/edit-icon.svg";

import { useCoinContext } from "../../../context/CoinContext";
import { useConfirmModalContext } from "../../../context/ConfirmModalContext";
import Button from "../../../components/Button/Button";
import Loader from "../../../components/Loader/Loader";
import { formatPrice } from "../../../utils/helpers";
import { deletePortfolio, updatePortfolio } from "../../../api/firebase-db";
import { useCurrentUser } from "../../../context/AuthContext";

const PortfolioDetails = ({
	portfolio,
	isEditMode,
	onEditModeToggle,
	onTitleChange,
	onSave,
	isSaveButtonDisabled,
	setFollowers,
}) => {
	const { currency } = useCoinContext();
	const { openConfirmModal } = useConfirmModalContext();
	const { currentUser } = useCurrentUser();
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(false);

	const isFollowing = portfolio.followers.some((f) => f === currentUser?.uid);
	const isFollowButtonDisabled =
		currentUser === null || isFollowing || isLoading;
	const isEditButtonVisible = currentUser?.uid === portfolio.owner.uid;
	const isFollowButtonVisible = !isEditButtonVisible;

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
					toast.error(error);
				} finally {
					setIsLoading(false);
				}
			}
		);
	};

	const followHandler = async () => {
		setIsLoading(true);

		const followers = portfolio.followers.slice(0);
		followers.push(currentUser.uid);

		try {
			await updatePortfolio({
				...portfolio,
				followers,
			});

			setFollowers(followers);
			toast.success(`Success! You are now following ${portfolio.title}.`);
		} catch (error) {
			toast.error(error);
		} finally {
			setIsLoading(false);
		}
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
					<h5>{portfolio.followers.length.toLocaleString()}</h5>
					{isFollowButtonVisible && (
						<Button
							text={isFollowing ? "following" : "follow"}
							isDisabled={isFollowButtonDisabled}
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
					<li>
						{new Date(portfolio.createdOn).toLocaleDateString()}
					</li>
				</ul>
				<ul>
					<li>Updated On</li>
					<li>
						{new Date(portfolio.updatedOn).toLocaleDateString()}
					</li>
				</ul>
			</div>
		</div>
	);
};

export default PortfolioDetails;
