import React, { useState, useEffect } from "react";
import "./PortfolioHub.css";
import hubIcon from "../../assets/icons/portfolio-icon-white.svg";
import PortfolioTableRow from "../../components/PortfolioTableRow/PortfolioTableRow";
import CryptoTable from "../../components/CryptoTable/CryptoTable";
import { Link } from "react-router-dom";
import Button from "../../components/Button/Button";
import CategoriesMenu from "../../components/CategoriesMenu/CategoriesMenu";
import { portfolioCategories } from "../../constants/categories";

const PortfolioHub = () => {
	const [category, setCategory] = useState("newest");
	const [isLoading, setIsLoading] = useState(false);

	const categoriesHandler = (value) => {
		setIsLoading(true);
		setCategory(value);
	};

	useEffect(() => {
		console.log(category);
	}, [category]);

	return (
		<section className="hub">
			<h2 className="page-header">
				<img src={hubIcon} alt="hubIcon" />
				Portfolio Hub
			</h2>

			<div className="portfolio-cta-wrapper">
				<div className="cta-text">
					<h3>Join The Crypto Community</h3>
					<p>
						Manage and compare your Portfolio's performance with the
						community.
					</p>
				</div>
				<Link to={"/hub/create"}>
					<Button text="create portfolio"></Button>
				</Link>
			</div>

			<CategoriesMenu
				categories={portfolioCategories}
				category={category}
				onCategoryChange={categoriesHandler}
			/>

			<div className="portfolios-wrapper">
				<CryptoTable
					columns={[
						"#",
						"Portfolios",
						"Allocation",
						"Profit/Loss",
						"Followers",
					]}
				>
					<PortfolioTableRow />
					<PortfolioTableRow />
					<PortfolioTableRow />
					<PortfolioTableRow />
				</CryptoTable>
			</div>
		</section>
	);
};

export default PortfolioHub;
