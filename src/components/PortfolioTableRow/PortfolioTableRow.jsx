import React from "react";
import Button from "../Button/Button";
import { Link } from "react-router-dom";
import plusIcon from "../../assets/icons/plus-icon.svg";

const PortfolioTableRow = () => {
	return (
		<Link className="table-layout" to={"/portfolio/1"}>
			<p>1</p>
			<div>
				<p>Low Risk Classic Porfolio</p>
			</div>

			<p>1,239</p>

			<p className="green">16,70%</p>

			<p>
				<Button text={"follow"} svg={plusIcon} />
			</p>
		</Link>
	);
};

export default PortfolioTableRow;
