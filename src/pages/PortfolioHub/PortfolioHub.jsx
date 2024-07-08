import React from "react";
import "./PortfolioHub.css";
import hubIcon from "../../assets/icons/portfolio-icon-white.svg";
import PortfolioTableRow from "../../components/PortfolioTableRow";
import CryptoTable from "../../components/CryptoTable/CryptoTable";

const PortfolioHub = () => {
	return (
		<section className="hub">
			<h2 className="page-header">
				<img src={hubIcon} alt="hubIcon" />
				Portfolio Hub
			</h2>

			<div className="portfolios-wrapper">
				<CryptoTable
					columns={[
						"#",
						"Portfolios",
						"Followers",
						"Total P/L",
						"Action",
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
