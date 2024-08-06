import { Link } from "react-router-dom";
import Button from "../../../components/common/Button/Button";

const homePortfolio =
	"https://firebasestorage.googleapis.com/v0/b/coinfolio-109f2.appspot.com/o/assets%2Fhome-portfolio.svg?alt=media&token=1defc3f6-7a3e-45ca-9178-78e63d3d937f";

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
