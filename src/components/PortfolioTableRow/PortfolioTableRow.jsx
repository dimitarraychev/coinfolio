import React from "react";
import Button from "../Button/Button";
import { Link } from "react-router-dom";
import { useCoinContext } from "../../context/CoinContext";

const PortfolioTableRow = () => {
	const { currency } = useCoinContext();

	const followHandler = (e) => {
		e.preventDefault();
	};

	return (
		<Link className="table-layout" to={"/hub/1"}>
			<p>1</p>
			<div className="portfolio-title">
				<p>Low Risk Classic Porfolio</p>
				<p className="owner">@username</p>
			</div>

			<p>{currency.symbol}5000</p>

			<p className="change green">16,70%</p>

			<div className="last-column">
				<p>1,239</p>
				<Button text={"follow"} onClick={followHandler} />
			</div>
		</Link>
	);
};

export default PortfolioTableRow;
