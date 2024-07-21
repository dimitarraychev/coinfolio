import React, { useState, useRef, useContext } from "react";
import "./PortfolioDetails.css";
import arrowUp from "../../../assets/icons/arrow-up.svg";
import arrowDown from "../../../assets/icons/arrow-down.svg";
import editIcon from "../../../assets/icons/edit-icon.svg";
import confirmIcon from "../../../assets/icons/confirm-icon.svg";

import { CoinContext } from "../../../context/CoinContext";
import Button from "../../../components/Button/Button";

const PortfolioDetails = ({ portfolio, onTitleChange }) => {
	const { currency } = useContext(CoinContext);
	const editableTitleRef = useRef(null);
	const [isEditingTitle, setIsEditingTitle] = useState(false);

	const editTitleHandler = (e) => {
		const title = editableTitleRef.current;

		if (title.isContentEditable) {
			setIsEditingTitle(false);
			title.contentEditable = "false";
			e.target.src = editIcon;
			return;
		}

		setIsEditingTitle(true);
		title.contentEditable = "true";
		e.target.src = confirmIcon;
		title.focus();
	};

	return (
		<div className="portfolio-details">
			<div className="title-wrapper">
				<div className="title">
					<h2
						ref={editableTitleRef}
						className="editable-title"
						contentEditable={false}
						onInput={onTitleChange}
					>
						{portfolio.title}
					</h2>
					<img
						src={editIcon}
						alt="edit"
						className={`edit-img ${isEditingTitle && "shown"}`}
						onClick={editTitleHandler}
					/>
				</div>
				<p className="owner">@{portfolio.owner}</p>
				<Button text={"delete"} />
			</div>

			<div className="followers-wrapper">
				<label htmlFor="portfolio-followers">Followers</label>
				<div className="follower-bottom">
					<h5>{portfolio.followers.toLocaleString()}</h5>
					<Button text={"follow"} />
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
					{portfolio.currentBalance}
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
						{portfolio.alltimeProfitLoss}
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
					<li>ETH, CRO, ADA</li>
				</ul>
				<ul>
					<li>Total Allocation</li>
					<li>
						{currency.symbol}
						{portfolio.totalAllocation}
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
		</div>
	);
};

export default PortfolioDetails;
