import React from "react";
import { Link } from "react-router-dom";

import homePortfolio from "../../../assets/images/home-portfolio.svg";
import Button from "../../../components/Button/Button";

const PortfolioSection = () => {
	return (
		<section className="home-portfolio">
			<div className="home-portfolio-text">
				<p className="subheading">global rankings</p>
				<h2>Build Your Portfolio & Monitor Performance</h2>
				<p>
					Easily create your personalized crypto portfolio from the
					top 250 cryptocurrencies and stay updated on its
					performance. Our intuitive platform allows you to track
					price changes and monitor market trends all in one place.
				</p>

				<Link to={"/hub"} className="home-btn-portfolio">
					<Button text="check portfolios" />
				</Link>
			</div>

			<img
				src={homePortfolio}
				alt="portfolio"
				className="home-section-img"
			/>
		</section>
	);
};

export default PortfolioSection;
