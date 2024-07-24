import React, { useState, useRef, useContext } from "react";
import { toast } from "react-toastify";

import "./PortfolioDetails.css";
import arrowUp from "../../../assets/icons/arrow-up.svg";
import arrowDown from "../../../assets/icons/arrow-down.svg";
import editIcon from "../../../assets/icons/edit-icon.svg";

import { CoinContext } from "../../../context/CoinContext";
import Button from "../../../components/Button/Button";
import ConfirmModal from "../../../components/ConfirmModal/ConfirmModal";
import { formatPrice } from "../../../utils/helpers";

const PortfolioDetails = ({
	isEditMode,
	onEditModeToggle,
	portfolio,
	onTitleChange,
	onSave,
}) => {
	const { currency } = useContext(CoinContext);
	const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
	const editableTitleRef = useRef(null);

	const closeConfirmModalHandler = (e) => setIsConfirmModalOpen(false);
	const openConfirmModalHandler = (e) => setIsConfirmModalOpen(true);

	const followHandler = () =>
		toast.success(`Success! You are now following ${portfolio.title}.`);

	return (
		<div className="portfolio-details">
			<div className="title-wrapper">
				<div className="title">
					<h2
						ref={editableTitleRef}
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
				<p className="owner">@{portfolio.owner}</p>
				{isEditMode ? (
					<div className="btn-wrapper">
						<Button text={"save"} onClick={onSave} />
						<Button
							text={"delete"}
							onClick={openConfirmModalHandler}
						/>
					</div>
				) : (
					<Button
						text={"edit"}
						isGhost={true}
						onClick={onEditModeToggle}
					/>
				)}
			</div>
			<div className="followers-wrapper">
				<label>Followers</label>
				<div className="follower-bottom">
					<h5>{portfolio.followers.toLocaleString()}</h5>
					<Button text={"follow"} onClick={followHandler} />
				</div>
			</div>
			<div className="current-balance-wrapper">
				<label className="balance-label" htmlFor="current-balance">
					Current Balance
				</label>
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
					<li>{portfolio.topPerformers.join(", ")}</li>
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
						{new Date(
							portfolio.createdOn * 1000
						).toLocaleDateString()}
					</li>
				</ul>
				<ul>
					<li>Updated On</li>
					<li>
						{new Date(
							portfolio.updatedOn * 1000
						).toLocaleDateString()}
					</li>
				</ul>
			</div>

			{isConfirmModalOpen && (
				<ConfirmModal
					onClose={closeConfirmModalHandler}
					onConfirm={closeConfirmModalHandler}
					message={"Are you sure you want to delete this portfolio?"}
				/>
			)}
		</div>
	);
};

export default PortfolioDetails;
