import React from "react";
import "./PortfolioHub.css";
import hubIcon from "../../assets/icons/portfolio-icon-white.svg";
import PortfolioCard from "../../components/PortfolioCard/PortfolioCard";

const PortfolioHub = () => {
	return (
		<section className="hub">
			<h2 className="page-header">
				<img src={hubIcon} alt="hubIcon" />
				Portfolio Hub
			</h2>

			<div className="portfolios-wrapper">
				<PortfolioCard />
				<PortfolioCard />
				<PortfolioCard />
				<PortfolioCard />
			</div>
		</section>
	);
};

export default PortfolioHub;
